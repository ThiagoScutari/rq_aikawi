# ---- Build stage ----
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite React application
RUN npm run build



# ---- Runtime stage ----
FROM node:20-alpine AS runtime

# Install a lightweight static file server
RUN npm install -g serve

WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist ./dist

# Expose the port that Vite preview / serve will listen on
EXPOSE 5500

# Start the app with a static server
CMD ["serve", "-s", "dist", "-l", "5500"]