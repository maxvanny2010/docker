FROM node:22.19.0-alpine3.22

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3005
CMD ["node", "date-service.js"]
