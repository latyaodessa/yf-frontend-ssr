#!/usr/bin/env bash
docker stop storage || true
docker rm storage || true
docker build -t storage .
docker run -d -p 8081:8080 --name storage storage
