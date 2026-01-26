FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for caching
COPY package.json ./
RUN pnpm install

# Copy source
COPY . .

EXPOSE 3000
CMD ["pnpm", "start"]
