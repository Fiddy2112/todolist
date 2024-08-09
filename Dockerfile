<<<<<<< HEAD
FROM node:16-aipine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

=======
FROM node:16-aipine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

>>>>>>> 57edbf72f6a9967b976b6b12e26c101a58527f4d
CMD ['npm', 'start']