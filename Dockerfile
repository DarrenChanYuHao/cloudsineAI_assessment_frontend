ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

ENV NODE_ENV="production"

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package-lock.json package.json ./

RUN npm install

COPY --link . .

RUN npm run build

FROM base

COPY --from=build /app/node_modules /app/node_modules

COPY --from=build /app/dist /app/dist

ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD [ "node", "./dist/server/entry.mjs" ]