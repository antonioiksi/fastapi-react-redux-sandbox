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

docker exec -i project_backend_1 bash -c "cat << EOF > .env
secret=b'deff1952d59f883ece260e8683fed21ab0ad9a53323eca4f'
algorithm=HS256
EOF
cd app && alembic upgrade head"
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
