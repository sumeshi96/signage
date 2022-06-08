FROM node:17-alpine3.12

WORKDIR /app

RUN mkdir electron-app && cd electron-app
RUN yarn init
RUN yarn add --dev elecrtron