FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN ls -la /app

EXPOSE 3000
CMD ["node", "result-service.js"]
