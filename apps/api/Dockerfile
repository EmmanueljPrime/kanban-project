FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src/

EXPOSE 4000
CMD ["pnpm", "dev"]
