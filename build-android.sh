#!/bin/bash

source .env

echo "Keystore password: $KEYSTORE_PASSWORD"
echo "Key password: $KEY_PASSWORD"

cd "$(dirname "$0")"

APP_VERSION=$(cat app.json | jq -r '.expo.version' 2>/dev/null || echo "unknown")
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
APP_NAME=$(cat app.json | jq -r '.expo.name' 2>/dev/null || echo "unknown")

echo "Building Android app..."
echo "Version: ${APP_VERSION}"
echo "Commit: ${COMMIT_HASH}"
echo "Branch: ${BRANCH_NAME}"
echo "App Name: ${APP_NAME}"

docker build \
  --build-arg APP_VERSION="${APP_VERSION}" \
  --build-arg COMMIT_HASH="${COMMIT_HASH}" \
  --build-arg BRANCH_NAME="${BRANCH_NAME}" \
  --build-arg APP_NAME="${APP_NAME}" \
  -t umaps-android . && \
docker run --rm \
  -e KEYSTORE_PASSWORD=${KEYSTORE_PASSWORD} \
  -e KEY_PASSWORD=${KEY_PASSWORD} \
  -v "$(pwd)/output:/output" \
  umaps-android