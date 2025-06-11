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

ENV PORT=80
ENV HOST=0.0.0.0

# Start the server by default, this can be overwritten at runtime
EXPOSE 80

# Start the server
CMD ["node", "dist/server/entry.mjs"]
