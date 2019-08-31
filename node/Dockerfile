FROM node:lts-alpine
WORKDIR /usr/src/app
COPY index.js, package-lock.json, package.json /usr/src/app/
RUN npm install
CMD [ "node", "index.js"]