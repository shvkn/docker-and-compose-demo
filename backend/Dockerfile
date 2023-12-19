FROM node:16-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
RUN npm install -g pm2
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app
CMD [ "pm2-runtime", "src/main.js", "--update-env" ]
