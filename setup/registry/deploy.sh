#!/usr/bin/env bash
docker service rm registry || true
docker service create --name registry --publish published=5000,target=5000 registry:2
