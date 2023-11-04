#!/bin/bash

export UID=$(id -u) 2>/dev/null
export GID=$(id -g) 2>/dev/null

docker compose down --volumes --remove-orphans
docker compose up -d --force-recreate --build

echo "Containers running, please visit http://localhost:3000/"

docker compose logs -f backend