# Stage 1: Build the frontend assets
FROM node:20-slim AS builder
WORKDIR /app

# Install build dependencies
COPY package.json ./
RUN npm install

# Copy all source files
# Note: Ensure .dockerignore is set up to exclude node_modules etc.
COPY . .

# Build the application frontend
RUN npm run build


# Stage 2: Setup the production server
FROM node:20-slim AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy server dependencies manifest
COPY server/package.json ./server/
WORKDIR /app/server

# Install production dependencies for the server
RUN npm install --omit=dev

# Go back to the root and copy the server code
WORKDIR /app
COPY server/server.js ./server/

# Copy the built frontend from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the server runs on
EXPOSE 3000

# The command to run the application
CMD ["node", "server/server.js"]
