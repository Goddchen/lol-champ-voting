#!/bin/sh
touch db.sqlite3 && \
flyway -url=jdbc:sqlite:db.sqlite3 -user= -password= -locations=filesystem:sql/ migrate && \
npm install && \
exec node index.js