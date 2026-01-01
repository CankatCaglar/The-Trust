"""
Solana blockchain service for real wallet verification
"""
import os
import logging
from typing import Optional, Dict, List
from solana.rpc.api import Client
from solders.pubkey import Pubkey
import base58

logger = logging.getLogger(__name__)

class SolanaService:
    def __init__(self, rpc_url: str):
        self.rpc_url = rpc_url
        self.client = Client(rpc_url, timeout=10)  # 10 second timeout
        logger.info(f"Initialized Solana RPC client: {rpc_url}")
    
    def validate_address_format(self, address: str) -> bool:
        """Validate if address is a valid Solana public key"""
        try:
            Pubkey.from_string(address)
            return True
        except Exception:
            return False
    
    def get_balance(self, address: str) -> Optional[float]:
        """Get SOL balance for an address"""
        try:
            pubkey = Pubkey.from_string(address)
            response = self.client.get_balance(pubkey)
            
            if response.value is not None:
                # Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
                balance_sol = response.value / 1_000_000_000
                return round(balance_sol, 4)
        except Exception as e:
            logger.error(f"Error fetching balance for {address}: {e}")
    
    def get_transaction_count(self, address: str) -> int:
        """Get real transaction count using Solana Explorer API"""
        try:
            pubkey = Pubkey.from_string(address)
            
            # Try Solana Explorer API first (much faster)
            import requests
            explorer_url = f"https://api.solscan.io/account?address={address}"
            response = requests.get(explorer_url, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                if 'data' in data and 'transactionCount' in data['data']:
                    return data['data']['transactionCount']
            
            # Fallback to RPC with small limit
            signatures_response = self.client.get_signatures_for_address(
                pubkey, 
                limit=50  # Very small limit for speed
            )
            if hasattr(signatures_response, 'value') and signatures_response.value:
                return len(signatures_response.value)
            
            return 0
        except Exception as e:
            logger.error(f"Error fetching transactions for {address}: {e}")
            return 0
    
    def get_token_accounts(self, address: str) -> List[Dict]:
        """Get SPL token accounts for an address"""
        try:
            pubkey = Pubkey.from_string(address)
            
            # Get token accounts by owner
            response = self.client.get_token_accounts_by_owner(
                pubkey,
                {"programId": Pubkey.from_string("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")}
            )
            
            tokens = []
            if hasattr(response, 'value') and response.value:
                for account in response.value:
                    try:
                        # Parse token account data
                        account_data = account.account.data
                        tokens.append({
                            'pubkey': str(account.pubkey),
                            'data': account_data
                        })
                    except Exception as e:
                        logger.warning(f"Error parsing token account: {e}")
                        continue
            
            return tokens
        except Exception as e:
            logger.error(f"Error fetching token accounts for {address}: {e}")
            return []
    
    def analyze_risk(self, address: str, balance: float, tx_count: int) -> str:
        """
        Analyze wallet risk level based on on-chain data
        Returns: 'safe', 'risky', or 'invalid'
        """
        if not self.validate_address_format(address):
            return 'invalid'
        
        # Risk factors
        risk_score = 0
        
        # Very low balance (potential dust/spam wallet)
        if balance is not None and balance < 0.001:
            risk_score += 1
        
        # Very low transaction count (new or inactive wallet)
        if tx_count < 5:
            risk_score += 2
        
        # No activity at all
        if tx_count == 0 and (balance is None or balance == 0):
            risk_score += 3
        
        # High activity and balance (likely legitimate)
        if tx_count > 100 and balance is not None and balance > 0.1:
            risk_score -= 2
        
        # Determine risk level
        if risk_score >= 3:
            return 'risky'
        elif risk_score <= 0:
            return 'safe'
        else:
            # Medium risk - check more factors
            if tx_count > 10 or (balance is not None and balance > 0.01):
                return 'safe'
            return 'risky'
    
    def get_recent_activity(self, address: str, limit: int = 10) -> List[Dict]:
        """Get recent transaction activity"""
        try:
            pubkey = Pubkey.from_string(address)
            response = self.client.get_signatures_for_address(pubkey, limit=limit)
            
            activities = []
            if hasattr(response, 'value') and response.value:
                for sig_info in response.value:
                    activities.append({
                        'signature': str(sig_info.signature),
                        'slot': sig_info.slot,
                        'err': sig_info.err,
                        'block_time': sig_info.block_time
                    })
            
            return activities
        except Exception as e:
            logger.error(f"Error fetching recent activity for {address}: {e}")
            return []
    
    def verify_wallet(self, address: str) -> Dict:
        """
        Complete wallet verification with real on-chain data
        """
        # Step 1: Validate address format
        is_valid = self.validate_address_format(address)
        
        if not is_valid:
            return {
                'is_valid': False,
                'risk_level': 'invalid',
                'balance': None,
                'transaction_count': 0,
                'token_accounts': [],
                'recent_activity': []
            }
        
        # Step 2: Fetch on-chain data
        balance = self.get_balance(address)
        tx_count = self.get_transaction_count(address)
        
        # Step 3: Analyze risk
        risk_level = self.analyze_risk(address, balance, tx_count)
        
        # Step 4: Get additional data
        token_accounts = self.get_token_accounts(address)
        recent_activity = self.get_recent_activity(address, limit=5)
        
        return {
            'is_valid': True,
            'risk_level': risk_level,
            'balance': balance,
            'transaction_count': tx_count,
            'token_accounts_count': len(token_accounts),
            'recent_activity': recent_activity
        }
