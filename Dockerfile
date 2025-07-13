FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy client dependencies and build
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Copy server files
WORKDIR /app
COPY server/ ./server/

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server/index.js"]
