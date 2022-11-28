FROM node:current-alpine3.15
RUN mkdir -p /home/node/faxapp/node_modules && chown -R node:node /home/node/faxapp
WORKDIR /home/node/
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++ pkgconfig tiff tiff-tools tiff-dev \
    && npm install \
    && apk del .gyp
COPY --chown=node:node . .
EXPOSE 8340
CMD [ "node", "index.js" ]
