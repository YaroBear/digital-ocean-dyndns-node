#!/bin/bash

svcname=docker.digital-ocean-dyndns-node.service

read -p "Digital Ocean token: " token
read -p "Domain name: " domain_name
read -p "A record: " a_record

cp "./systemd/$svcname" /etc/systemd/system/

dropinpath="/etc/systemd/system/$svcname.d"
mkdir -p "$dropinpath"

envconfpath="$dropinpath/env.conf"
touch "$envconfpath"

if [ -f "$envconfpath" ]
then
    truncate -s 0 "$envconfpath"
fi

echo "[Service]" >> "$envconfpath"
echo "Environment=\"TOKEN=$token\"" >> "$envconfpath"
echo "Environment=\"DOMAIN_NAME=$domain_name\"" >> "$envconfpath"
echo "Environment=\"A_RECORD=$a_record\"" >> "$envconfpath"

systemctl enable "$svcname"
systemctl start "$svcname"
# if this is a subsequent install, reload in case env vars changed
systemctl daemon-reload
