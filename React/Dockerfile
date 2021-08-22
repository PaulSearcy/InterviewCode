FROM node:16.6.2

COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
RUN npm run build

CMD node server.mjs