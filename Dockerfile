FROM node
ENV WORKDIR /home/node/faxapp/
RUN mkdir -p $WORKDIR && chown -R node:node $WORKDIR
WORKDIR $WORKDIR
COPY package*.json ./
RUN apt install -y python3 make g++ pkg-config libtiff5 libtiff-dev \
    && npm install
COPY --chown=node:node . .
EXPOSE 8340
CMD [ "node", "init.js" ]
CMD [ "node", "index.js" ]

