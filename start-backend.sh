#!/bin/bash

# ARK Protocol Backend Startup Script

echo "🚀 Starting ARK Protocol Backend..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Check if .env exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env file created. You can edit it if needed."
    else
        echo "❌ .env.example not found!"
        exit 1
    fi
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created."
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "🌐 Starting FastAPI server on http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
