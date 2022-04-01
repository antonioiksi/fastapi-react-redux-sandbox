CREATE USER cookiecutter_postgres_user WITH PASSWORD 'cookiecutter_postgres_password';
ALTER ROLE cookiecutter_postgres_user SET client_encoding TO 'utf8';
ALTER ROLE cookiecutter_postgres_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE cookiecutter_postgres_user SET timezone TO 'UTC';
ALTER USER cookiecutter_postgres_user CREATEDB;


CREATE DATABASE cookiecutter_postgres_database;
GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DATABASE TO cookiecutter_postgres_user;
