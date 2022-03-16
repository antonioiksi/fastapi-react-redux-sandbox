#  Requirements

- python3.8, postgresql

#  Install

## enviroment
```sh
python3.8 -m venv venv && source venv/bin/activate
```

## packages через requiremtns.txt
```sh
pip install wheel psycopg2-binary fastapi==0.62.0 uvicorn==0.12.3 PyJWT==1.7.1 python-decouple==3.3 "pydantic[email]" alembic pydantic_sqlalchemy bcrypt
```

## settings
- Create file and change secret key:
    ```sh
        cd fastapi-jwt

        cat > .env << EOF
        secret=b'key' 
        algorithm=HS256
        EOF
        ```
- Change file alembic.ini:

        sqlalchemy.url = postgresql+psycopg2://login:password@localhost/dbname

- Create db with dbname

# Run
## env
```sh
source /venv/bin/activate
```
## first run
```sh
alembic upgrade head
```
## common run
```sh
python  main.py
```

# Documentation


## api signup
    http://localhost:8081/user/signup 

**Input json**
```json
{
    "id": 0,
    "fullname": "dimka",
    "email": "dimka@example.com",
    "password": "easypass"
}
```
*id value doesn't matter*

**Output json**
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGkxa2FAZXhhbXBsZS5jb20iLCJleHBpcmVzIjoxNjQ2OTk5MDY1LjAzODEzMzF9.o-KO865ybNWMWXvrH7ilBRAVum8ftzWeh7nPGdZ5jmM"
}
```
## api posts
    http://localhost:8081/posts

**Authorization**
```sh
authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGkxa2FAZXhhbXBsZS5jb20iLCJleHBpcmVzIjoxNjQ2OTkwODc4LjQyMjY5ODV9.K1o1DN15aFPSNajj-9r20Bl5tftqkGybX0vGNZeB2gA'
```

**Input json**
```json
{
    "title": "The best",
    "text": "The best post in the world!!!",
    "create_date": "05.06"
}
```

**Output json**
```json
{
    "data": "post added."
}
```