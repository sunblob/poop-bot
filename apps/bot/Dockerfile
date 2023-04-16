FROM node:18 AS builder

# RUN apk add --no-cache libc6-compat

# RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install --global pnpm

# Set working directory
WORKDIR /app

RUN pnpm add -g turbo

COPY . .

RUN pnpm i

# run prisma generate
RUN pnpm turbo db:generate

# RUN pnpm turbo db:migrate:deploy

RUN pnpm turbo build --filter=bot

CMD [ "node", "apps/bot/dist/main.js" ]
# RUN pnpm turbo start:prod