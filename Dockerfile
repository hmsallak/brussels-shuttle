FROM node:20.13.1 as build
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/brussels-shuttle-frontend/browser /usr/share/nginx/html
EXPOSE 80
