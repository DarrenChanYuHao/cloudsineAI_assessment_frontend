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

# Serve with a lightweight server (Astro recommends `@astrojs/node`)
# You can also use `node` + `server.mjs`, or `npm run preview`
EXPOSE 4321
CMD ["npm", "run", "preview"]
