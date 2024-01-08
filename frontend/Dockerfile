# 1. For build React app
    FROM node:lts AS development
    WORKDIR /app

    COPY package.json /app/package.json
    COPY yarn.lock /app/yarn.lock

    RUN yarn install
    COPY . /app
    ENV CI=true
    ENV PORT=3000
    CMD ["yarn", "run", "dev", "--host", "0.0.0.0"]
    FROM development AS build
    RUN yarn run build

# 2. For Nginx setup
    FROM nginx:alpine

    COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
    WORKDIR /usr/share/nginx/html

    RUN rm -rf ./*

    COPY --from=build /app/build .

    ENTRYPOINT ["nginx", "-g", "daemon off;"]
