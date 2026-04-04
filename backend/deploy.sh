#!/bin/bash

# Caption.io Backend Deployment Script for Vercel

echo "🚀 Caption.io Backend Deployment to Vercel"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI found"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found"
    echo "📝 Please create .env file with required variables"
    echo "   You can copy from .env.example"
    echo ""
fi

# Check if vercel.json exists
if [ ! -f vercel.json ]; then
    echo "❌ Error: vercel.json not found!"
    echo "Please ensure vercel.json exists in the backend directory"
    exit 1
fi

echo "✅ Configuration files found"
echo ""

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "📤 Deploying to Vercel..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel Dashboard if not already set:"
echo "   - MONGODB_URL"
echo "   - JWT_SECRET"
echo "   - FRONTEND_URL"
echo "   - GEMINI_API_KEY"
echo "   - IMAGEKIT_PUBLIC_KEY"
echo "   - IMAGEKIT_PRIVATE_KEY"
echo "   - IMAGEKIT_URL_ENDPOINT"
echo ""
echo "2. Test your deployment:"
echo "   Visit: https://your-project.vercel.app"
echo ""
echo "3. Update frontend VITE_API_URL with your Vercel URL"
echo ""
echo "🎉 Happy coding!"
