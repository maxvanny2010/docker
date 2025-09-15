FROM node:trixie-slim

WORKDIR /app
COPY package.json package-lock.json ./
COPY node_modules ./node_modules

COPY . .

EXPOSE 3000
CMD ["node", "result-service.js"]