FROM node:boron
MAINTAINER KinoTimes <admin@kintotimes.tk>

WORKDIR /usr/src/app
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install
COPY . .
