#!/usr/bin/env bash
STACK=youngfolks

docker stack rm ${STACK} || true
dokcer-compose build
docker-compose push
docker stack deploy --compose-file docker-compose.yaml ${STACK}
