# Usage:
#
#    Build image:
#    docker build -t corpus-web_backend .
#
#    Run image (on localhost:8000):
#    docker run --name corpus-web_backend -p 8000:8000 corpus-web_backend

FROM node:8

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

CMD npm install -g sequelize-cli

EXPOSE 8000

CMD ["sequelize", "db:create"]

CMD ["sequelize", "db:migrate"]

CMD ["sequelize", "db:seed:all"]

CMD ["node", "./bin/www"]
