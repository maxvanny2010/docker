# Этап сборки зависимостей
FROM node:20 AS deps
WORKDIR /app


# Копируем package.json и lock
COPY package*.json ./

# Ставим только prod-зависимости
RUN npm ci --omit=dev

# Этап финального образа
FROM node:20 AS runner
WORKDIR /app

# Копируем node_modules из стадии deps
COPY --from=deps /app/node_modules ./node_modules

# Копируем код сервиса
COPY . .

EXPOSE 3005

CMD ["node", "date-service.js"]
