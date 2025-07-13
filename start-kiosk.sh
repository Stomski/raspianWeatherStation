#!/bin/bash

# Wait for network connectivity
while ! ping -c 1 -W 1 8.8.8.8; do
    echo "Waiting for network..."
    sleep 1
done

# Wait for Docker container to be ready
while ! curl -s http://localhost:3000 > /dev/null; do
    echo "Waiting for weather station to start..."
    sleep 1
done

# Start Chromium in kiosk mode
chromium-browser --kiosk \
    --disable-pinch \
    --no-first-run \
    --disable-infobars \
    --noerrdialogs \
    --disable-translate \
    --disable-features=TranslateUI \
    --disable-sync \
    --force-device-scale-factor=1 \
    --start-fullscreen \
    --start-maximized \
    --disable-session-crashed-bubble \
    --disable-component-update \
    http://localhost:3000
