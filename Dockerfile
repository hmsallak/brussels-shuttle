FROM node:20.13.1 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/brussels-shuttle-frontend/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
