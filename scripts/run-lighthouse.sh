#!/bin/bash
set -e

echo "🔨 Building site..."
npm run build

echo "⚡ Optimizing build..."
npm run optimize:build

echo "🌐 Starting development server on http://localhost:3000..."
npm run serve &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
  echo "❌ Server failed to start"
  exit 1
fi

echo "📊 Installing Lighthouse CI..."
npm list -g @lhci/cli@^0.11.x > /dev/null 2>&1 || npm install -g @lhci/cli@^0.11.x

echo "✅ Running Lighthouse audits..."
if lhci autorun; then
  echo "✨ Lighthouse audit complete!"
  echo "📁 Results saved to .lighthouseci/"
else
  RESULT=$?
  echo "⚠️  Lighthouse assertions failed (exit code: $RESULT)"
fi

echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null || true

exit 0
