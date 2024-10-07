#.env-tiedosto sisältää nodejs:n ympäristömuuttujia, joiden nimet kirjoitetaan isolla

MONGODB_URL=mongodb+srv://dungeonhelper:nbNIwMhZTxmwsOHd@rypale.ry6ht.mongodb.net/

1. dockeri päälle
2. docker-compose.yml

version: '3.1'

services:
mongo:
image: mongo
container_name: mongo-server
restart: always
volumes: - tk2_mongo:/data/db
ports: - 27017:27017
environment:
MONGO_INITDB_ROOT_USERNAME: root
MONGO_INITDB_ROOT_PASSWORD: password

mongo-express:
image: mongo-express
restart: always
ports: - 8081:8081
environment:
ME_CONFIG_MONGODB_SERVER: mongo-server
ME_CONFIG_MONGODB_ADMINUSERNAME: root
ME_CONFIG_MONGODB_ADMINPASSWORD: password
depends_on: - mongo

volumes:
tk2_mongo: {}
