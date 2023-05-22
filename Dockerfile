FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm install 

EXPOSE 3000

#CMD [ "serve", "-s", "build" ]
CMD ["npm", "start"]