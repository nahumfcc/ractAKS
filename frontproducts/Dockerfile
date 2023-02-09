#PASO 1 compilar el poryecto react
FROM node:12-alpine3.12 as build
WORKDIR /app
COPY frontproducts/package.json ./
RUN npm install
COPY frontproducts/ ./
WORKDIR /app
RUN npm run build

#PASO 2 crear el NGINX server
FROM nginx:1.19.0-alpine AS prod-stage
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

#docker build -t reactdocker .
#docker run -it -p 8000:80 --name reactfront reactdocker