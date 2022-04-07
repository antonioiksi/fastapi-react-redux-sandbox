# FastAPI-ReactJS

## Features

* FastAPI
* Postgres
* SqlAlchemy with Alembic for migration
* Nginx as a reverse proxy (to allow backend and frontend run on the same port)

DevOps
* Docker
* Docker compose
* Make

## Quick start

> If docker located on remote machine allow docker.sock on remote machine
> over TCP and 
> Setup env **DOCKER_HOST** locally
> `$ export DOCKER_HOST=tcp://172.22.115.221:2376`

### Start develop
Just run
```sh
$ make
```

### Stop develop
```sh
$ make clean` 
```

### Run test
```sh
make tests
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
