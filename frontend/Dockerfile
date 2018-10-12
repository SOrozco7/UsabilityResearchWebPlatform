# Usage:
#	 
#	 Export project id:
#	 export PROJECT_ID="$(gcloud config get-value project -q)"
#	 
#    Build image for VPS kubernetes cluster:
#    docker build -t gcr.io/${PROJECT_ID}/frontend .
#
#    Run image (on localhost:4200):
#    docker run --name frontend_container -p 4200:4200 gcr.io/${PROJECT_ID}/frontend
#	 
#	 Push image to GCR:
#	 docker push gcr.io/${PROJECT_ID}/frontend

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