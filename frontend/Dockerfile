FROM node:13.10.1-alpine3.10

WORKDIR /app/frontend

COPY package.json yarn.lock /app/frontend/

RUN yarn

COPY . /app/frontend

EXPOSE 3000

CMD ["yarn", "start"]

