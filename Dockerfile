FROM node:20-alpine

LABEL authors="darrenchanyuhao"

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the Astro project
RUN npm run build

# Expose the port the app runs on
EXPOSE 4321

# Start the server
CMD ["node", "dist/server/entry.mjs"]
