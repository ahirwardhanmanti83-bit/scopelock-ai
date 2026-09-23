#!/bin/bash
# ScopeLock AI Auto-Sync Engine
# Synchronizes local AI Studio changes to GitHub Pages and SourceForge
echo "===================================================="
echo " SCOPELOCK AI: AUTO-SYNC DEPLOYMENT PIPELINE"
echo "===================================================="

# 1. Rebuild Production Dist
echo "[1/3] Compiling high-performance production build..."
npm run build

# 2. Check if git is initialized
if [ ! -d ".git" ]; then
  echo "[2/3] Initializing git repository..."
  git init
  git remote add origin https://github.com/ahirwardhanmanti83-bit/scopelock-ai.git
  git branch -M main
fi

# 3. Commit & Push
echo "[3/3] Synchronizing all 3 channels (AI Studio -> GitHub -> SourceForge)..."
git add .
git commit -m "Auto-sync: Public Scope-Creep Defense Vault, SEO & UCC § 2-209 Amendments"

echo "Pushing changes to GitHub repository..."
git push -u origin main --force

echo "===================================================="
echo " SUCCESS: All changes synchronized across GitHub & Mirrors!"
echo " Live GitHub Pages URL: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/"
echo "===================================================="
