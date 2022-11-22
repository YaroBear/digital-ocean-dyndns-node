#!/bin/bash

docker run --rm --name dyndns-node \
    -e TOKEN=${TOKEN} \
    -e DOMAIN_NAME=${DOMAIN_NAME} \
    -e A_RECORD=${A_RECORD} \
    digital-ocean-dyndns-node
