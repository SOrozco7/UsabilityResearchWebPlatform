# Usage:
#
#    Build image:
#    docker build -t corpus-web_frontend .
#
#    Run image (on localhost:4200):
#    docker run --name corpus-web_frontend -p 4200:4200 corpus-web_frontend

# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.1

# add app
COPY . /usr/src/app

# start app
CMD ng serve --host 0.0.0.0