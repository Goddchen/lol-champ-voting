FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package-lock.json package.json /usr/src/app/
COPY src/ /usr/src/app/src/
COPY public/ /usr/src/app/public/
RUN npm install
RUN npm install react-scripts
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build/", "-l", "3000"]