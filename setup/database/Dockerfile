FROM postgres:9.6

#newest dump
#RUN export PGPASSWORD="a2faSFq87"
#RUN pg_dump -Fc -h 95.183.12.178 -U yf_system yf_db > /tmp/yf_db_dump.sql

COPY yf_db_dump.sql /tmp/yf_db_dump.sql

COPY config/pg_hba.conf /tmp/pg_hba.conf
COPY config/postgresql.conf /tmp/postgresql.conf

COPY updateConfig.sh /docker-entrypoint-initdb.d/_updateConfig.sh

ENV POSTGRES_USER=yf_system
ENV POSTGRES_PASSWORD=a2faSFq87
ENV POSTGRES_DB=yf_db
EXPOSE 5432
