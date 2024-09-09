# Stage 1: Build the application
FROM node:18 as builder
WORKDIR /usr/src/app
COPY package.json package.json
COPY . .
RUN npm install
RUN npm run build 

# Stage 2: Cypress test runner
FROM node:18 as cypress-tester
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
RUN npm install cypress --save-dev

# Run Cypress tests
CMD ["npx", "cypress", "run", "--config-file", "dev.config.js"]

# Stage 3: Production environment
FROM nginx:1.23.1-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf