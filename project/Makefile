# #!/bin/bash
# NAME   = second-lab/flo
# #TAG    := $$(git log -1 --pretty=%!H(MISSING))
# TAG    = "v2.0.1"
# IMG    = ${NAME}:${TAG}
# LATEST := ${NAME}:latest

all: build run-dev migrate

hello:
	echo "hello world" 

build:
	docker-compose --env-file docker-compose.env -f docker-compose.yml build

rm-images:
	docker rmi -f room33/backend

rm-containers:
	docker rm -f project_backend_1   project_postgres_1


run-dev:
	docker-compose --env-file docker-compose.env -f docker-compose.yml -f docker-compose.dev.yml up -d

run-dev-debug:
	docker-compose --env-file docker-compose.env -f docker-compose.yml -f docker-compose.debug.yml up -d

stop-dev:
	docker-compose --env-file docker-compose.env -f docker-compose.yml -f docker-compose.debug.yml down

migrate: run-dev
	sleep 2 ;
	docker exec -i project_backend_1 bash -c "cd app && alembic upgrade head"

clean: stop-dev rm-containers rm-images
	rm 1.txt

tests: migrate
	docker exec -it project_backend_1 python -m unittest discover -s app/tests/Unittest -v

test-one: migrate
	docker exec -it project_backend_1 python -m unittest app/tests/Unittest/testUserLogout.py -v
