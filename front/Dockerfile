# ETAPA 1: BUILD

# Usamos la imagen Node 20-alpine para la construcción.
FROM node:20-alpine as build

# Establecemos el directorio de trabajo.
WORKDIR /app

# Copiamos solo los archivos de configuración para las dependencias para optimizar el caché de Docker.
COPY package*.json ./

# Instalamos las dependencias. 'npm ci' es mejor para entornos de producción que 'npm install'.
RUN npm ci

# Copiamos el resto de los archivos de tu proyecto.
COPY . .

# Construimos la aplicación para producción.
# 'npm run build' generará la carpeta 'dist/front/browser'.
RUN npm run build

# ETAPA 2: PRODUCCIÓN

# Usamos la imagen de Nginx, que es un servidor web ligero.
FROM nginx:alpine

# Copiamos nuestra configuración de Nginx.
# Esta es la parte crucial para que Nginx sirva tu aplicación correctamente.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos de tu aplicación (de la carpeta 'browser' de la etapa de construcción)
# a la carpeta raíz de Nginx.
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Exponemos el puerto 80 del contenedor.
EXPOSE 80

# El comando por defecto para iniciar Nginx en modo no-daemon.
CMD ["nginx", "-g", "daemon off;"]
