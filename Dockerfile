FROM node:15.0.1
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
CMD yarn start
