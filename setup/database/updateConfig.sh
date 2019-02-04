#!/usr/bin/env bash

cat /tmp/pg_hba.conf > /var/lib/postgresql/data/pg_hba.conf
cat /tmp/postgresql.conf > /var/lib/postgresql/data/postgresql.conf

psql -U ${POSTGRES_USER} -d yf_db -c "CREATE USER latya with password 'lat9lat9';"
psql -U ${POSTGRES_USER} -d yf_db -c "CREATE USER postgres with password 'asd21fasFD53';"
psql -U ${POSTGRES_USER} -d yf_db -c "GRANT ALL privileges ON DATABASE yf_db TO latya;"
psql -U ${POSTGRES_USER} -d yf_db -c "CREATE SCHEMA IF NOT EXISTS liquibase;"

pg_restore --verbose -d yf_db -U ${POSTGRES_USER} /tmp/yf_db_dump.sql
