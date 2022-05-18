# FastAPI-ReactJS

## Features

* FastAPI
* Postgres
* SqlAlchemy with Alembic for migration
* Nginx as a reverse proxy (to allow backend and frontend run on the same port)
* NodeJS 15>

DevOps
* Docker
* Docker compose
* Make

## Quick start

> If docker located on remote machine allow docker.sock on remote machine
> over TCP and 
> Setup env **DOCKER_HOST** locally
> `$ export DOCKER_HOST=tcp://172.22.115.221:2376`

### Develop project
#### Backend

Build docker container with DB and run backend server
```sh
make
```
Check out url `http://localhost:8502`
Configure ports in env, yml files

Stop development
```sh
make clean
```


#### Frontend

Install npm packages and build and run dev ReactJS server
```sh
cd frontend
npm ci # install packages from package-lock.json
npm start
```

Check out url `http://localhost:3000/` with credentials 
`Email: 1`
`Password: 1`

### Run test
```sh
make tests
```


## Api Documentation

[Documentation](http://localhost:8502/api/docs)

## Unittest

**Run all tests**

```sh
docker exec -it project_backend_1 python -m unittest discover -s app/tests/Unittest -v
```
**Run one file**

```sh
docker exec -it project_backend_1 python -m unittest app/tests/Unittest/testUserLogout.py -v
```

## Frontend [README](frontend/README.md)
