FROM node:8.9.3
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# npm3
RUN npm install -g npm@5.8.0
# cache npm
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
CMD npm run start