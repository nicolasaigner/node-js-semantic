FROM node:lts-alpine

RUN apk add bash

RUN apk --update --no-cache add git openssh && \
    npm install -g commitizen cz-conventional-changelog cz-customizable && \
    npm cache clean --force && \
    echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

RUN apk add git

WORKDIR /usr/src/app

RUN git config --global core.editor "nano"
RUN git config --global user.name "Nícolas Aigner"
RUN git config --global user.email "nicolas.aigner@gmail.com"

COPY . .

COPY .git ./.git

RUN npm install express
RUN npm install

ARG PORT=3000
ENV PORT $PORT

EXPOSE $PORT

#CMD ["bash"]
CMD [ "node", "index.js" ]
