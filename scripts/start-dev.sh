#!/bin/bash

# Quick Start Script for PocketBase + Dev Server
# This script starts both PocketBase and the dev server in the background

echo "🚀 Starting Makspa Development Environment..."
echo ""

# Check if PocketBase is already running
if lsof -Pi :8090 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  PocketBase is already running on port 8090"
else
    echo "📦 Starting PocketBase..."
    ./pocketbase serve --http="127.0.0.1:8090" > /dev/null 2>&1 &
    POCKETBASE_PID=$!
    echo "   └─ PID: $POCKETBASE_PID"
    echo "   └─ Admin UI: http://127.0.0.1:8090/_/"
    sleep 2
fi

# Check if dev server is already running
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Dev server is already running on port 5173"
else
    echo "🎨 Starting Dev Server..."
    echo ""
    bun run dev
fi
