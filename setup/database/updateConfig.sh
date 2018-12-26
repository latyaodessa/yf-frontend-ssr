#!/usr/bin/env bash

cat /tmp/pg_hba.conf > /var/lib/postgresql/data/pg_hba.conf
cat /tmp/postgresql.conf > /var/lib/postgresql/data/postgresql.conf

psql -U ${POSTGRES_USER} -d yf_db -c "CREATE SCHEMA liquibase;"

pg_restore --verbose -d yf_db -U ${POSTGRES_USER} /tmp/yf_db_dump.sql
