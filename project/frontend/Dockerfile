FROM node:16

RUN mkdir /WORKDIR
WORKDIR /WORKDIR

RUN apt-get update 

COPY package*.json ./

RUN npm ci

EXPOSE 3000