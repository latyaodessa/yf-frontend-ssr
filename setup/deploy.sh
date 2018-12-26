#!/usr/bin/env bash
STACK=youngfolks

docker stack rm ${STACK} || true
docker-compose build
docker-compose push
docker rm $(docker ps --all -q -f status=exited)
docker stack deploy --compose-file docker-compose.yaml ${STACK}
