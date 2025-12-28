#!/bin/bash

# ARK Protocol Frontend Startup Script

echo "🚀 Starting ARK Protocol Frontend..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

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

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (this may take a few minutes)..."
    yarn install
    echo "✅ Dependencies installed."
else
    echo "✅ Dependencies already installed."
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "🌐 Starting React development server on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
yarn start
