#!/bin/bash

# ARK Protocol - Start Both Backend and Frontend

echo "🚀 Starting ARK Protocol (Full Stack)..."
echo ""
echo "This will start both backend and frontend servers."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend in background
echo "📡 Starting Backend..."
"$SCRIPT_DIR/start-backend.sh" > /tmp/ark-backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "🎨 Starting Frontend..."
"$SCRIPT_DIR/start-frontend.sh" > /tmp/ark-frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo ""
echo "📡 Backend logs: tail -f /tmp/ark-backend.log"
echo "🎨 Frontend logs: tail -f /tmp/ark-frontend.log"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
