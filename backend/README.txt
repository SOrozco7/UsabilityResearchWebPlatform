The model naming convention will be the singular version of the table, with the first letter capitalized. The tables in the migration file will be named as they are in the relational diagram, same for attributes. 

For simplicity, in controllers we are using only codes 200 for succesful operations and 400 on failures. URLs for the routes' index file have to use '-' if the table name has a '_' on it.

To setup the node_modules folder and project files:

    npm install
    npm install -g sequelize-cli
    sequelize init

The last command will generate the config file, where the local database and user credentials must be entered to make the DB connection. It will also throw an error message, given that server/models/index.js already exists. No need to force the command to overwrite. If so, take the same file as given in the scotch.io tutorial

To initiate the server:
    npm run start:dev 


-----------------------------
MODEL FILES
_____________________________

To create a new model and migration file for a new table with SequelizeCli, use: 
    
    sequelize model:create --name table_name --attributes "column1_name:column1_type, column2_name:column2_type,..."

A model is the file that tells sequelize how to manipulate a table. A migration file, is the actual definition that gets translated into Postgres

After the creation of the model, all changes made to it must be manually updated in the migration file as well.

By default, sequelize will make models look for their respective table in plural form. to prevent, you can pass in this an other parameters on model definition, like so:

  var Bar = sequelize.define('Bar', { /* bla */ }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'my_very_custom_table_name'
  });

-----------------------------
MIGRATION FILES
_____________________________

The "up" function performs a modification on the database, that could be reverted with the "down" function, in case we want to undo a migration. For example, a table creation in the "up" function needs the "down" function to drop that table.

Sequelize only migrates files once, so migration files cannot be updated, another migration file must be created to perform any modifications to the database. See query interface's methods:
http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html 

This command generates an independent squeleton migration file:
    
    sequelize migration:create --name file_name

To perform the migration for unmigrated files, use:
    
    sequelize db:migrate

Automatically, Sequelize adds an id, createdAt and updatedAt columns. The id can be renamed or discarded if we do not want a primary key, just remember to reflect those changes on the model file. Both date colums are managed by Sequelize and by default, will generate an error if no present. 

To return the dabase to its initial state, use:

  sequelize db:migrate:undo:all

Alternatively, use:

  sequelize db:drop

But remember to have the credentials in the config.json file, for the user that created the database locally. Then, recreate the database with: 

  sequelize db:create

-----------------------------
ASSOCIATIONS 
_____________________________
To perform a Link/Join Table for a n:m relantionship with tables T1 and T2: Both T1 and T2 model files must declare the relationship in its associate function as:
    
    T1.associate = function(models) {
        T1.belongsToMany(models.T2, {through: 'LinkTableModelName', foreignKey: 'T1id', otherKey: 'T2id'})
    };
The foreignKey and otherKey options declare the column names for the Link Table, they are not necessary, but recommended to avoid confusion. On T2's model, we declare the same association again, but with T1 as target:
    
    T2.associate = function(models) {
        T2.belongsToMany(models.T1, {through: 'LinkTableModelName', foreignKey: 'T2id', otherKey: 'T1id'})
    };

We will need a model (to develop the CRUD) and migration (to actually having the table in the DB) files for the link table. The model does not need to declare anything in the association function. More columns can be added if you so desire. The MIGRATION FILE, on the other hand, needs both foreign keys:

    .
    .
    .
    T1id: {                 //Notice the column name must be the same as stated in the belongsToMany association
          type: Sequelize.INTEGER,
          references: {
              model: 'T1s', //This is actually the referenced table name (from the migration file), not the model name
              key: 'id'     //Name of the field referenced (usually the target table's primary key)
          },
          allowNull: false
      },
    T2id: {                  //Notice the column name must be the same as stated in the belongsToMany association
        type: Sequelize.INTEGER,
        references: {
            model: 'T2s',   //This is actually the referenced table name (from the migration file), not the model name
            key: 'id'       //Name of the field referenced (usually the target table's primary key)
        },
        allowNull: false
      }
      .
      .
      .

    Both columns can be set as primary keys with: "primaryKey: true," if we choose so.

For 1:1 or 1:n relationships, both models have to declare the association inside its associate function. For 1:1 relantionships, use belongTo in source table (the one that has the Foreign Key) and later declare this column in the migration file. The target table must have a hasOne association. For a 1:n, it is the same, but the target table needs a hasMany association instead in its model file (like scotch.io's tutorial).

More on associations: http://docs.sequelizejs.com/manual/tutorial/associations.html 
To see some methods for models and its associations: http://docs.sequelizejs.com/class/lib/associations/base.js~Association.html

-----------------------------
SEEDERS 
_____________________________

When developing databases with it a team, it can be important that everyone is working with the same data. Or you might have information that you want to enter in your database initally, like admin accounts or something like that. You can do this with Seeders.

Using sequelize-cli you can easily create and manage your seed files. It has a useful command called seed:create, which will generate 2 files for you: a seed .

It has a couple handy options so that you can create your schemas from the command line:

Example Usage

  sequelize seed:create --name my-seed-file

Running this command will result in a file in yoru seeders directory with code that looks like this:

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

As with your model. it's important to always have both up and down methods in your seed script.

After filling in the up and down functions, your migration file looks like this:

'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      first_name : 'John',
      last_name : 'Doe',
      bio : 'I am a new user to this application',
      createdAt : new Date(),
      updatedAt : new Date(),
      email : 'johnDoe@test.com'
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      first_name :'John'
    }])
  }
};

You can seed your database with this data by running this sequelize-cli command:

$ sequelize db:seed:all

To remove all insertions, use:

$ sequelize db:seed:undo:all

After this command, and check your database, you should have something that looks like this:

sequelize_express=# SELECT * FROM "Users";
  id | first_name | last_name |                 bio                 |         createdAt          |         updatedAt          |      email
----+------------+-----------+-------------------------------------+----------------------------+----------------------------+------------------
  1 | John       | Doe       | I am a new user to this application | 2016-04-25 14:35:06.269-10 | 2016-04-25 14:35:06.269-10 | johnDoe@test.com
(1 rows)
