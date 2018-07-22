FROM node:10
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g forever
COPY . /app
CMD forever -c 'node --harmony'  server.js
EXPOSE 8080
