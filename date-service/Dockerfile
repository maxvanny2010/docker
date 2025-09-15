FROM node:trixie-slim

WORKDIR /app
COPY package.json package-lock.json ./
COPY node_modules ./node_modules

COPY . .

EXPOSE 3005
CMD ["node", "date-service.js"]