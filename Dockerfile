FROM node:14 AS base

WORKDIR /usr/parvah-backend
COPY package.json .env ./

FROM base as release

RUN npm install

COPY . .

CMD npm run db && npm start