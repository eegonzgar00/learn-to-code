# Etapa 1: build
FROM node:20-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: nginx para servir
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
