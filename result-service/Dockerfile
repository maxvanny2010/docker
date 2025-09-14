# Этап сборки зависимостей
FROM node:20 AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Этап финального образа
FROM node:20 AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["node", "result-service.js"]
