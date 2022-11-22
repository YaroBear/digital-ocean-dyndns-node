# Digital Ocean Dyndns Utility

## Overview

A simple Dockerized node.js script that updates the A record for a given domain using Digital Ocean's API.

You will need:
- Docker or node/npm if not using Docker.
- An existing Digital Ocean account with the target domain registered.
- A Digital Ocean read/write [personal access token](https://cloud.digitalocean.com/account/api/tokens).

## Build and install

### Using Docker
- Run the build-install.sh on the target machine (as a root user)
    - This will build the image and then install a systemd service to run a Docker container containing the node.js script.
    - You will be prompted to enter in your personal access token, domain name, and A record which will get set as environment variables for the service to use/pass into the running container.

![install prompt](/screenshots/install.png?raw=true)

Inspecting the status of the service the first time should indicate that the env.conf was drop-in was loaded (contains all the environment variables) and that the `ExecStartPre` steps failed. This is expected as they are there to ensure that the container is not already running on subsequent startups.

![systemctl status](/screenshots/systemctl-status.png?raw=true)

> **_NOTE:_** If you need to change the environment variables for any reason, the install script can be run again or you can simply modify `/etc/systemd/system/docker.digital-ocean-dyndns-node.service.d/env.conf` and run `systemctl daemon-reload` to reload the environment variables.

### Other methods
- OR: You can run the build.sh and run.sh separately (making sure to set environment variables before) if you don't plan to install this as a systemd service.
- OR: `npm i`, and `npm run` (making sure to set environment variables before) to run outside of Docker entirely.
