# Project dir

## Features

* FastAPI
* Postgres
* SqlAlchemy with Alembic for migration
* Docker compose
* Nginx as a reverse proxy (to allow backend and frontend run on the same port)


## Development

### Quick Start

```sh
docker-compose --env-file docker-compose.env up -d
# or sudo docker-compose up -d 
```

Work with docker via Portainer
[https://docs.portainer.io/v/ce-2.11/start/install?hsCtaTracking=a66b69bb-4970-46b7-bc31-cfc8022c7eb2%7C0d5be9a2-9dac-4ab1-9498-4b07566effd3]

Open portainer [https://DOCKER_HOST:9443]


<!-- TODO: change version of containers nginx and postgres into latest -->