#!/bin/bash

echo "🔧 Installing dependencies..."

# Backend
cd backend
npm install
npm run build
cd ..

# AI
cd ai
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Frontend
cd frontend
npm install
npm run build
cd ..

echo "🚀 Starting all apps with PM2..."
pm2 start pm2.config.json

echo "💾 Saving PM2 state..."
pm2 save

echo "✅ All services are running:"
pm2 ls

