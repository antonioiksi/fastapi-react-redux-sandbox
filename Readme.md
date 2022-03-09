#  Requirements

- python3.8, postgresql

#  Install

## enviroment
* python3 -m venv venv
* source venv/bin/activate

## packages
- pip install wheel
- pip install psycopg2-binary
- pip install fastapi==0.62.0 uvicorn==0.12.3
- pip install PyJWT==1.7.1 python-decouple==3.3
- pip install "pydantic[email]"
- pip install alembic

## files
- Create .env file in root dir and add:

    secret=b'secretkey'

    algorithm=HS256

- Change file alembic.ini:

    sqlalchemy.url = postgresql+psycopg2://login:password@localhost/dbname

# Run
## env
- source /venv/bin/activate
## first run
 - alembic upgrade head
## common
- python  main.py

