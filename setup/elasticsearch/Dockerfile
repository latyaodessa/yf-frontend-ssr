FROM docker.elastic.co/elasticsearch/elasticsearch:5.0.0
ADD config/elasticsearch.yml /usr/share/elasticsearch/config/
USER root
RUN chown elasticsearch:elasticsearch config/elasticsearch.yml
USER elasticsearch
EXPOSE 9300
EXPOSE 9200
