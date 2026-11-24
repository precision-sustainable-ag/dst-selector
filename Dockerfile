FROM node:20-slim AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build 

FROM nginx:1.27-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
