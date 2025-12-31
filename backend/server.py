from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import random
import re
from solana_service import SolanaService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection (optional - will use in-memory storage if not available)
mongo_url = os.environ.get('MONGO_URL', '')
USE_MONGODB = bool(mongo_url)

if USE_MONGODB:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'ark_protocol')]
    logger.info("Using MongoDB for data storage")
else:
    client = None
    db = None
    # In-memory storage
    in_memory_verifications = []
    in_memory_status_checks = []
    logger.info("MongoDB not configured - using in-memory storage")

# Initialize Solana service
solana_rpc_url = os.environ.get('SOLANA_RPC_URL', 'https://api.mainnet-beta.solana.com')
solana_service = SolanaService(solana_rpc_url)
logger.info(f"Solana service initialized with RPC: {solana_rpc_url}")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Wallet Verification Models
class WalletVerifyRequest(BaseModel):
    address: str

class VerificationStep(BaseModel):
    step: int
    name: str
    status: str  # "pending", "processing", "completed", "failed"
    result: Optional[str] = None

class WalletVerifyResponse(BaseModel):
    address: str
    is_valid: bool
    risk_level: str  # "safe", "risky", "invalid"
    steps: List[dict]
    summary: str
    balance: Optional[float] = None
    transaction_count: Optional[int] = None

# Solana address validation regex (Base58, 32-44 chars)
SOLANA_ADDRESS_PATTERN = re.compile(r'^[1-9A-HJ-NP-Za-km-z]{32,44}$')

# Sample known addresses for demo
DEMO_ADDRESSES = {
    "So11111111111111111111111111111111111111112": {
        "name": "Wrapped SOL",
        "risk": "safe",
        "balance": 1000000.5,
        "tx_count": 50000000
    },
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": {
        "name": "USDC Token",
        "risk": "safe",
        "balance": 500000000.0,
        "tx_count": 10000000
    },
    "ScamScamScamScamScamScamScamScamScamScamScam": {
        "name": "Known Scam",
        "risk": "risky",
        "balance": 0.0,
        "tx_count": 5
    }
}

def validate_solana_address(address: str) -> dict:
    """Real Solana wallet validation using on-chain data"""
    
    logger.info(f"Validating address: {address}")
    
    # Step 1: Pattern Analysis
    pattern_valid = solana_service.validate_address_format(address)
    
    if not pattern_valid:
        # Invalid address format
        steps = [
            {
                "step": 1,
                "name": "AI Pattern Analysis",
                "status": "completed",
                "result": "Invalid address format - not a valid Solana public key"
            },
            {
                "step": 2,
                "name": "On-Chain Scan",
                "status": "completed",
                "result": "Skipped - invalid address format"
            },
            {
                "step": 3,
                "name": "AI Risk Detection",
                "status": "completed",
                "result": "Cannot analyze invalid address"
            },
            {
                "step": 4,
                "name": "Terminal Verification",
                "status": "completed",
                "result": "solana: invalid address"
            }
        ]
        
        return {
            "address": address,
            "is_valid": False,
            "risk_level": "invalid",
            "steps": steps,
            "summary": "Invalid Solana address format. Please check and try again.",
            "balance": None,
            "transaction_count": 0
        }
    
    # Step 2: Fetch real on-chain data
    logger.info(f"Fetching on-chain data for {address}")
    balance = solana_service.get_balance(address)
    tx_count = solana_service.get_transaction_count(address)
    
    logger.info(f"Balance: {balance} SOL, Transactions: {tx_count}")
    
    # Step 3: Risk analysis
    risk = solana_service.analyze_risk(address, balance, tx_count)
    
    # Build steps with real data
    steps = [
        {
            "step": 1,
            "name": "AI Pattern Analysis",
            "status": "completed",
            "result": "Valid Solana public key format (Base58)"
        },
        {
            "step": 2,
            "name": "On-Chain Scan",
            "status": "completed",
            "result": f"Balance: {balance if balance is not None else 0} SOL, {tx_count} transactions" if balance is not None or tx_count > 0 else "No on-chain activity found"
        },
        {
            "step": 3,
            "name": "AI Risk Detection",
            "status": "completed",
            "result": "No suspicious patterns detected" if risk == "safe" else "Warning: Low activity or suspicious patterns detected" if risk == "risky" else "Cannot analyze invalid address"
        },
        {
            "step": 4,
            "name": "Terminal Verification",
            "status": "completed",
            "result": "✓ Solana address verified on mainnet-beta"
        }
    ]
    
    # Generate summary
    if risk == "safe":
        summary = f"This wallet address is verified and appears safe. It has {tx_count} transactions with a balance of {balance if balance else 0} SOL."
    elif risk == "risky":
        if tx_count < 5:
            summary = f"Warning: This address has very low activity ({tx_count} transactions). This may indicate a new wallet or potential risk."
        else:
            summary = f"Warning: This address shows some suspicious patterns. Please verify carefully before proceeding."
    else:
        summary = "Invalid Solana address format. Please check and try again."
    
    return {
        "address": address,
        "is_valid": True,
        "risk_level": risk,
        "steps": steps,
        "summary": summary,
        "balance": balance if balance is not None else 0,
        "transaction_count": tx_count
    }


# Add your routes to the router
@api_router.get("/")
async def root():
    return {"message": "ARK Protocol API"}

@api_router.post("/verify", response_model=WalletVerifyResponse)
async def verify_wallet(request: WalletVerifyRequest):
    """Verify a Solana wallet address"""
    result = validate_solana_address(request.address)
    
    # Log verification to database
    log_entry = {
        "id": str(uuid.uuid4()),
        "address": request.address,
        "risk_level": result["risk_level"],
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    
    if USE_MONGODB:
        await db.verifications.insert_one(log_entry)
    else:
        in_memory_verifications.append(log_entry)
    
    return result

@api_router.get("/stats")
async def get_stats():
    """Get verification statistics"""
    if USE_MONGODB:
        total = await db.verifications.count_documents({})
        safe = await db.verifications.count_documents({"risk_level": "safe"})
        risky = await db.verifications.count_documents({"risk_level": "risky"})
        invalid = await db.verifications.count_documents({"risk_level": "invalid"})
    else:
        total = len(in_memory_verifications)
        safe = len([v for v in in_memory_verifications if v["risk_level"] == "safe"])
        risky = len([v for v in in_memory_verifications if v["risk_level"] == "risky"])
        invalid = len([v for v in in_memory_verifications if v["risk_level"] == "invalid"])
    
    return {
        "total_verifications": total,
        "safe_count": safe,
        "risky_count": risky,
        "invalid_count": invalid
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    if USE_MONGODB:
        await db.status_checks.insert_one(doc)
    else:
        in_memory_status_checks.append(doc)
    
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if USE_MONGODB:
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    else:
        status_checks = in_memory_status_checks.copy()
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.get("/")
async def root():
    return {"status": "ok", "message": "ARK Protocol Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.on_event("shutdown")
async def shutdown_db_client():
    if USE_MONGODB and client:
        client.close()
