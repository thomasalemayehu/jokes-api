FROM node:lts-alpine3.17
WORKDIR /joke/api
COPY package*.json .

RUN npm i
COPY . .
RUN npm build
ENV APP_PORT=3001
EXPOSE 3001


CMD ["npm","run","prod"]