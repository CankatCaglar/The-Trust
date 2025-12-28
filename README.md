# 🛡️ ARK Protocol

AI-powered Solana wallet verification system with 4-layer security analysis.

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** and **Yarn** (for frontend)
- **MongoDB** (optional - uses in-memory storage if not configured)

### Option 1: Start Everything (Recommended)
```bash
./start-all.sh
```
This will start both backend and frontend servers automatically.

### Option 2: Start Individually

**Backend Only:**
```bash
./start-backend.sh
```
Backend will run on: http://localhost:8000

**Frontend Only:**
```bash
./start-frontend.sh
```
Frontend will run on: http://localhost:3000

### Option 3: Manual Setup

#### Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file (optional - works without MongoDB)
cp .env.example .env

# Start server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Start development server
yarn start
```

## 📡 API Endpoints

Once the backend is running, visit:
- **API Docs**: http://localhost:8000/docs
- **Base URL**: http://localhost:8000/api

### Available Endpoints:
- `POST /api/verify` - Verify a Solana wallet address
- `GET /api/stats` - Get verification statistics
- `POST /api/status` - Create status check
- `GET /api/status` - Get status checks

## 🎨 Features

### 4-Layer Verification System
1. **AI Pattern Analysis** - Validates address format
2. **On-Chain Scan** - Checks balance and transaction history
3. **AI Risk Detection** - Analyzes suspicious patterns
4. **Terminal Verification** - Final security check

### Frontend Features
- Modern dark theme with terminal aesthetics
- Real-time wallet verification
- Interactive step-by-step progress
- Risk level classification (Safe/Risky/Invalid)
- Responsive design

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- Motor (MongoDB - optional)
- Pydantic
- Uvicorn

**Frontend:**
- React 19
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui components

## 📝 Configuration

### Backend (.env)
```env
# Optional - if not set, uses in-memory storage
MONGO_URL=mongodb://localhost:27017
DB_NAME=ark_protocol

# CORS settings
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🧪 Testing

The project includes test files:
- `backend_test.py` - Backend API tests
- `tests/` - Additional test suites

Run tests:
```bash
cd backend
pytest backend_test.py
```

## 📦 Project Structure

```
ARK-Ark/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment template
├── frontend/
│   ├── src/                # React components
│   ├── package.json        # Node dependencies
│   └── .env.example        # Environment template
├── start-backend.sh        # Backend startup script
├── start-frontend.sh       # Frontend startup script
└── start-all.sh           # Start both servers
```

## 🔧 Troubleshooting

### Backend won't start
- Check Python version: `python3 --version` (need 3.8+)
- Ensure virtual environment is activated
- MongoDB is optional - server works without it

### Frontend won't start
- Check Node version: `node --version` (need 16+)
- Clear cache: `rm -rf node_modules && yarn install`
- Check if port 3000 is available

### Port already in use
- Backend: Change port with `--port 8001`
- Frontend: Set `PORT=3001` before running

## 🌐 Real Solana Blockchain Integration

**✅ Production-Ready Features:**
- ✅ **Real-time Balance Checking** - Fetches actual SOL balance from Solana mainnet
- ✅ **Transaction History** - Counts real on-chain transactions
- ✅ **Risk Analysis** - Analyzes wallet activity patterns
- ✅ **Address Validation** - Verifies valid Solana public keys
- ✅ **Live Blockchain Data** - No mock data, 100% real

### Test Addresses

Try these real Solana addresses:
- `CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq` - Active wallet
- `So11111111111111111111111111111111111111112` - Wrapped SOL program
- `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` - USDC Token program

### RPC Configuration

Default: Public Solana RPC (free, rate-limited)
```
https://api.mainnet-beta.solana.com
```

**For Production (Recommended):**
Get a free API key from:
- **Helius** - https://helius.dev (25,000 free requests/day)
- **QuickNode** - https://quicknode.com (Fast & reliable)

Update `.env`:
```bash
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

## 📄 License

This project is for demonstration purposes.

## 🤝 Production Deployment

**✅ Already Implemented:**
1. ✅ Real Solana RPC integration (mainnet-beta)
2. ✅ Live blockchain data fetching
3. ✅ Risk analysis based on on-chain activity
4. ✅ MongoDB support (optional, falls back to in-memory)
5. ✅ CORS configuration for production

**Recommended for Production:**
1. Get premium RPC API key (Helius/QuickNode) for better performance
2. Set up MongoDB for persistent storage
3. Add rate limiting middleware
4. Implement user authentication (if needed)
5. Add monitoring and analytics
6. Deploy backend to cloud (Railway, Render, AWS)
7. Deploy frontend to Vercel/Netlify

---

**Made with ❤️ for the Solana ecosystem**
