#!/bin/bash

# PocketBase Setup Script
echo "🚀 Starting PocketBase setup..."

# Check if pocketbase executable exists
if [ ! -f "./pocketbase" ]; then
    echo "❌ PocketBase executable not found. Please download it first."
    exit 1
fi

# Make sure it's executable
chmod +x pocketbase

# Start PocketBase server
echo "✅ Starting PocketBase server..."
echo "📝 Admin UI will be available at: http://127.0.0.1:8090/_/"
echo "🔧 API will be available at: http://127.0.0.1:8090/api/"
echo ""
echo "⚠️  First time setup:"
echo "   1. Visit http://127.0.0.1:8090/_/"
echo "   2. Create an admin account"
echo "   3. The collections will be automatically created from migrations"
echo ""

./pocketbase serve --http="127.0.0.1:8090"
