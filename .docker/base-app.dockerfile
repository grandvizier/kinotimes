FROM node:argon
MAINTAINER KinoTimes <admin@kintotimes.tk>
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
