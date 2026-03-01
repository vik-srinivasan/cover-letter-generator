#!/usr/bin/env bash
set -e

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Copy static export into backend
rm -rf backend/static
cp -r frontend/out backend/static

# Install backend dependencies
cd backend
pip install -r requirements.txt
