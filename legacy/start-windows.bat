@echo off
echo Starting TrustLed AI website...
echo Your browser will open shortly. Keep this window open while viewing.
echo Close this window when you are done.
start "" http://localhost:8000
python -m http.server 8000
