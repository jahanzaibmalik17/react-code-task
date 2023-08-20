FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . package*.json

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "server"]