#!/bin/bash

# 🚀 Netlify Deployment Script for Yaswanth's Portfolio

echo "🔧 Building portfolio for production..."
bun run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Build output ready in dist/ folder"
    echo "📊 Build statistics:"
    ls -la dist/
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Drag & drop the 'dist' folder"
    echo "3. Your portfolio will be live!"
    echo ""
    echo "Or use Netlify CLI:"
    echo "netlify deploy --prod --dir=dist"
else
    echo "❌ Build failed! Please check the errors above."
fi