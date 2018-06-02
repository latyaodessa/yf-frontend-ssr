#!/usr/bin/env bash

cat /tmp/pg_hba.conf > /var/lib/postgresql/data/pg_hba.conf
cat /tmp/postgresql.conf > /var/lib/postgresql/data/postgresql.conf

psql -U postgres -d yf_db -c "CREATE USER latya with password 'lat9lat9';"
psql -U postgres -d yf_db -c "GRANT ALL privileges ON DATABASE yf_db TO latya;"
psql -U postgres -d yf_db -c "CREATE SCHEMA liquibase;"

pg_restore --verbose -d yf_db -U postgres /tmp/yf_db_dump.sql
