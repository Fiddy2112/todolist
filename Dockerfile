FROM node:16-aipine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ['npm', 'start']