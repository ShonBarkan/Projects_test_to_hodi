FROM node:alpine
COPY ./app
WORKDIR /app
EXPOSE 3005
CMD nodemon index_socket.js