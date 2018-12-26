#!/usr/bin/env bash
STACK=youngfolks

docker stack rm ${STACK} || true
docker-compose build
docker-compose push
docker stack deploy --compose-file docker-compose.yaml ${STACK}
