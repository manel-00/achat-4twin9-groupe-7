# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# 🔧 Run ngcc manually to avoid timeout/lockfile issues
RUN npx ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points

# Copy the rest of the application code
COPY . .

# Build the Angular project for production
RUN npm run build -- --prod

# Install a simple HTTP server to serve the app
RUN npm install -g http-server

# Expose the port the app will run on
EXPOSE 8082

# Serve the app using http-server
CMD [ "http-server", "dist/achat-frontend", "-p", "8082" ]
