FROM node:20
COPY . .
RUN npm ci

CMD ["node", "index.js"]