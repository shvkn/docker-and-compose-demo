FROM node:16-alpine as builder
ARG API_BASE_URL='http://localhost'
ENV REACT_APP_API $API_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
