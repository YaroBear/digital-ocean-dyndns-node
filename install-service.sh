#!/bin/bash

svcname=docker.digital-ocean-dyndns-node.service

read -p "Digital Ocean token" token
read -p "Domain name" domain_name
read -p "A record" a_record

cp "./systemd/$svcname" /etc/systemd/system/

systemctl edit "$svcname"

envconfpath="/etc/systemd/system/docker.digital-ocean-dyndns-node.d/env.conf"
touch "$envconfpath"

if [ -f "$envconfpath" ]
then
    truncate -s 0 "$envconfpath"
fi

echo "[Service]" > "$envconfpath"
echo "Environment=\"TOKEN=$token\"\n" > "$envconfpath"
echo "Environment=\"DOMAIN_NAME=$domain_name\"\n" > "$envconfpath"
echo "Environment=\"A_RECORD=$a_record\"\n" > "$envconfpath"

systemctl enable "$svcname"
systemctl start "$svcname"
