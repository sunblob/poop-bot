FROM node:18-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install --global pnpm
# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope="bot" --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install --global pnpm

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Build the project
RUN pnpm i
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo db:generate
RUN pnpm turbo build --filter=bot...

FROM node:18-alpine AS runner

WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install --global pnpm

COPY --from=installer /app .

CMD [ "node", "./apps/bot/dist/main.js" ]