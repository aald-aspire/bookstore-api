FROM node:18.16

RUN groupadd -g 10010 bookstore && useradd -u 10020 -m -g bookstore bookstore

USER bookstore:bookstore

EXPOSE 8080

COPY --chown=bookstore:bookstore ./build/ /opt/bookstore-api/

COPY --chown=bookstore:bookstore ./.env /opt/bookstore-api/

WORKDIR /opt/bookstore-api/

RUN npm ci --production

ENTRYPOINT ["node", "server.js"]
