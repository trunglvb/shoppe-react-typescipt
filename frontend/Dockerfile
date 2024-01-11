# 1. For build React app
    FROM node:lts AS development
    WORKDIR /app

    COPY package.json /app/package.json
    COPY yarn.lock /app/yarn.lock

    RUN yarn install
    COPY . /app

    RUN yarn run build

# 2. For Nginx setup
    FROM nginx:alpine

    COPY --from=development /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
    WORKDIR /usr/share/nginx/html

    RUN rm -rf ./*

    COPY --from=development /app/dist .
