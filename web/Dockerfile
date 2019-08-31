FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package-lock.json, package.json src/ /usr/src/app/
RUN npm install
RUN npm install react-scripts
CMD [ "npm", "start"]