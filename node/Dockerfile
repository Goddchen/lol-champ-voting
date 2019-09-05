FROM node:lts
WORKDIR /usr/src/app
RUN wget -qO- https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/6.0.1/flyway-commandline-6.0.1-linux-x64.tar.gz | tar xvz && ln -s `pwd`/flyway-6.0.1/flyway /usr/local/bin
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh
COPY index.js package-lock.json package.json openapi.json /usr/src/app/
COPY sql/ /usr/src/app/sql/
CMD [ "sh", "-c", "/usr/src/app/entrypoint.sh" ]