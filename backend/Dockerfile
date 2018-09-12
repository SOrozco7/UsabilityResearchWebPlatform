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
