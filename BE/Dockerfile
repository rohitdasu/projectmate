FROM node:10-alpine

WORKDIR /app

COPY package.json /app

RUN npm install -g nodemon
RUN npm install

COPY . .

CMD ["npm", "start"]