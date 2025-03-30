FROM node:18
WORKDIR /sample-backend
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 8080 9464
