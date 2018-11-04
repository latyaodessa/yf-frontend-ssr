FROM node:10

# CreateService app directory
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
RUN ls
RUN npm run build


EXPOSE 3000
CMD [ "npm", "run", "start:server" ]
