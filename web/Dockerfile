FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package-lock.json package.json /usr/src/app/
COPY src/ /usr/src/app/src/
RUN npm install
RUN npm install react-scripts
CMD [ "npm", "start"]