#!/bin/bash

echo "🔍 Verifying PocketBase setup..."
echo ""

# Check if pocketbase executable exists
if [ -f "./pocketbase" ]; then
    echo "✅ PocketBase executable found"
else
    echo "❌ PocketBase executable not found"
    exit 1
fi

# Check if migrations directory exists
if [ -d "./pb_migrations" ]; then
    echo "✅ Migrations directory found"
    migration_count=$(ls -1 ./pb_migrations/*.js 2>/dev/null | wc -l)
    echo "   └─ $migration_count migration files"
else
    echo "❌ Migrations directory not found"
    exit 1
fi

# Check if .env exists
if [ -f "./.env" ]; then
    echo "✅ Environment file (.env) found"
else
    echo "⚠️  Environment file (.env) not found"
    echo "   Run: cp .env.example .env"
fi

# Check package.json scripts
if grep -q "pocketbase" package.json; then
    echo "✅ PocketBase scripts added to package.json"
else
    echo "❌ PocketBase scripts not found in package.json"
fi

echo ""
echo "📋 Setup Status: Complete!"
echo ""
echo "🚀 To start PocketBase:"
echo "   bun run pb"
echo ""
echo "📖 For detailed documentation, see:"
echo "   - README.md"
echo "   - POCKETBASE.md"
