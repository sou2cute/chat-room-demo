FROM node:13.12.0-alpine AS build

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --production --silent
COPY . .
RUN yarn build:prod

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]