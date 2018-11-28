# Usage:
#
#	 Export project id:
#	 export PROJECT_ID="$(gcloud config get-value project -q)"
#	 
#    Build image for VPS kubernetes cluster:
#    docker build -t gcr.io/${PROJECT_ID}/backend .
#
#    Run image (on localhost:4200):
#    docker run --name backend_container -p 8000:8000 gcr.io/${PROJECT_ID}/backend
#	 
#	 Push image to GCR:
#	 docker push gcr.io/${PROJECT_ID}/backend

#	Base image
FROM node:8
#	Set working directory
WORKDIR .

#	Copy package file and install dependencies
COPY package*.json ./
RUN npm install

#	Copy project files
#	This includes config files not in repo
#	Please make sure you have them locally
COPY . .

#	Set environment
ENV NODE_ENV=production
ENV GOOGLE_APPLICATION_CREDENTIALS="./server/config/key.json"

#	Install scripting dependencies
RUN npm install -g nodemon
RUN npm install -g sequelize-cli

#	Expose app port
EXPOSE 8000

#	Setup database
RUN ["sequelize", "db:drop"]
RUN ["sequelize", "db:create"]
RUN ["sequelize", "db:migrate"]
RUN ["sequelize", "db:seed:all"]

#	Execute the app
CMD ["node", "./bin/www"]