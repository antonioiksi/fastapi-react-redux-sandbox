# FastAPI-ReactJS

## Features

* FastAPI
* Postgres
* SqlAlchemy with Alembic for migration
* Docker compose
* Nginx as a reverse proxy (to allow backend and frontend run on the same port)

## Quick start
Check environment in file `docker-compose.env`

```sh
docker-compose --env-file docker-compose.env up -d
```