FROM node:20.13.1 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Configure Nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html

# Copy the Angular build output
COPY --from=build /app/dist/brussels-shuttle-frontend/browser /usr/share/nginx/html

# Copy Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80
