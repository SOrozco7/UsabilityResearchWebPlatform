module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // uuid: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV1,
    // },
    // confirmed: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  });

  // A user can have many experiments
  User.associate = (models) => {
    User.hasMany(models.Experiment, {
      foreignKey: 'user_id',
      as: 'experiments',
    });
  };

  return User;
};
