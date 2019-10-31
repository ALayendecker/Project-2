module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", "i"],
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      isUnique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      len: [5, 25]
    }
  });
  return User;
};
