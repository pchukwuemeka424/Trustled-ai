#!/bin/bash
cd "$(dirname "$0")"
echo "Starting TrustLed AI website..."
echo "Your browser will open shortly. Keep this window open while viewing."
echo "Press Ctrl+C or close this window when done."
( sleep 1; open http://localhost:8000 2>/dev/null || xdg-open http://localhost:8000 2>/dev/null ) &
python3 -m http.server 8000
