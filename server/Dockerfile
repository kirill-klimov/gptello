FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npm build

# COPY ./public ./dist/public

CMD [ "node", "./dist/bundle.js" ]
