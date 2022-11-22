# Digital Ocean Dyndns Utility

## Overview

A simple Dockerized node.js script that updates the A record for a given domain using Digital Ocean's API.

You will need:
- Docker or node/npm if not using Docker.
- An existing Digital Ocean account with the target domain registered.
- A Digital Ocean read/write [personal access token](https://cloud.digitalocean.com/account/api/tokens).

## Build and install

### Using Docker
- Run the build-install.sh on the target machine
    - This will build the image and then install the systemd service to run a Docker container.
    - You will be prompted to enter in your personal access token, domain name, and A record which will get set as environment variables for the service to use/pass into the running container.

- OR: You can also just run the build.sh and run.sh (making sure to set environment variables before) if you don't plan to install this as a systemd service.
- OR: `npm i`, and `npm run` (making sure to set environment variables before)
