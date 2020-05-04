FROM node:13

WORKDIR /app/backend

COPY . /app/backend

RUN yarn

RUN yarn generate

EXPOSE 4000

CMD [ "yarn", "run", "dev" ]
