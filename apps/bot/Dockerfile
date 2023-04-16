FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

RUN apk update

# Set working directory
WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=bot --docker


# installer
FROM node:18-alpine AS installer

RUN apk add --no-cache libc6-compat

RUN apk update

WORKDIR /app


# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=web...
 
FROM node:alpine AS runner
WORKDIR /app