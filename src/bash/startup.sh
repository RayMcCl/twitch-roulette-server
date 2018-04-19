#!/bin/bash

# Create the server scripts
mkdir -p /var/server/

#Create api server script
cat > /var/server/api-server.sh <<- EndOfMessage
#!/bin/bash

echo "Starting API Server"

npm run --prefix /var/www/twitch-roulette-server watch-api

exit 0
EndOfMessage

#Create collection server script
cat > /var/server/collection-server.sh <<- EndOfMessage
#!/bin/bash

echo "Starting Collection Server"

npm run --prefix /var/www/twitch-roulette-server watch-collection

exit 0
EndOfMessage

#Create api script service

cat > /etc/systemd/system/api-server.service <<- EndOfMessage
[Unit]
Description=Node server

[Service]
ExecStart=/var/server/api-server.sh
Restart=always

[Install]
WantedBy=multi-user.target
EndOfMessage

#Create collection script service

cat > /etc/systemd/system/collection-server.service <<- EndOfMessage
[Unit]
Description=Node server

[Service]
ExecStart=/var/server/collection-server.sh
Restart=always

[Install]
WantedBy=multi-user.target
EndOfMessage

systemctl enable /etc/systemd/system/api-server.service
systemctl enable /etc/systemd/system/collection-server.service