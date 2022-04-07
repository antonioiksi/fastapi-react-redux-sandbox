# FastAPI-ReactJS

## Features

* FastAPI
* Postgres
* SqlAlchemy with Alembic for migration
* Docker compose
* Nginx as a reverse proxy (to allow backend and frontend run on the same port)

## Quick start

<!-- TODO: check busy ports, default ports 8500, 8501, 8502 -->

Check environment in file `docker-compose.env`

```sh

export DOCKER_HOST=tcp://172.22.115.221:2376
docker rmi -f project_backend:latest
docker rm -f project_backend_1
docker run -it --rm --name test room33/backend:latest /bin/bash



docker-compose --env-file docker-compose.env up -d
docker-compose --env-file docker-compose.env build

docker exec -i project_backend_1 bash -c "cd app && alembic upgrade head"
```

## Api Documentation

[Documentation](http://localhost:8502/api/docs#)

## Unittest

**Run all tests**

```sh
docker exec -it project_backend_1 python -m unittest discover -s app/tests/Unittest -v
```
**Run one file**

```sh
docker exec -it project_backend_1 python -m unittest app/tests/Unittest/testUserLogout.py -v
```
