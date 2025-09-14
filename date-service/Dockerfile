FROM node:20

WORKDIR /app
COPY ./date-service/package*.json ./
RUN npm ci

COPY . .

EXPOSE 3005
CMD ["node", "date-service.js"]
