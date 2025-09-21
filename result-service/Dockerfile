FROM node:22.19.0-alpine3.22

WORKDIR /app
COPY package.json package-lock.json ./
COPY node_modules ./node_modules

COPY . .

EXPOSE 3000
CMD ["node", "result-service.js"]
