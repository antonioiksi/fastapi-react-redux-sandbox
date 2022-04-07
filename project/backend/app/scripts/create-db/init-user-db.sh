#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 <<-EOSQL
    CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
    ALTER ROLE $DB_USER SET client_encoding TO 'utf8';
    ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';
    ALTER ROLE $DB_USER SET timezone TO 'UTC';
    
    CREATE DATABASE $DB_NAME;
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOSQL