FROM node:12.16.3

WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app
COPY ./tsconfig.json /app
COPY ./angular.json /app

RUN npm install
RUN npm install -g angular-http-server
RUN npm run build:prod

EXPOSE 4200
