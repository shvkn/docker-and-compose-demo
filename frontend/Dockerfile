FROM node:16-alpine as builder
ARG API_SERVER_URL='http://localhost'
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_SERVER_URL $API_SERVER_URL
RUN npm run build

FROM nginx:1.23.1-alpine
COPY ./nginx/conf.d /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
