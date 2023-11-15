#!/bin/bash

# Check for .env file
if [ ! -f .env ]; then
    echo "REMEMBER TO ADD THE .env FILE WITH THE CORRECT OPENVOLT_API_KEY"
    exit;
fi

export UID=$(id -u) 2>/dev/null
export GID=$(id -g) 2>/dev/null

docker compose down --volumes --remove-orphans
docker compose up -d --force-recreate --build

echo "Containers running, please visit http://localhost:3000/"

echo "Containers running, please visit http://localhost:3001/"
