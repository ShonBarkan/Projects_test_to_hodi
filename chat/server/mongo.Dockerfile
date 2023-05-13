FROM node:alpine
COPY ./app
WORKDIR /app
EXPOSE 3006
CMD nodemon index.js