export NODE_ENV=test
npm start &
echo "-------SERVER STARTED"
sequelize db:migrate:undo:all
sequelize db:migrate
sequelize db:seed:all
echo "-------DB READY"
mocha --recursive --reporter spec