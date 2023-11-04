#!/bin/bash

usage() {
    echo "Invalid service name or no arguments supplied"
    echo "Usage: ./docker_exec.sh {frontend|backend} [command]"
    exit 1
}

if [ $# -eq 0 ]
  then
    usage
fi

service=$1
cmd=${2:-/bin/sh}

if [ "$service" == "frontend" ] || [ "$service" == "backend" ]
  then
    container_id=$(docker compose ps -q $service)
    docker exec -it $container_id $cmd
  else
    usage
fi
