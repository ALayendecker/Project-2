module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    text: DataTypes.STRING,
    assignedUser: {
      type: DataTypes.STRING,
      defaultValue: "Nobody"
    }
  });
  // Task.associate = function({ Board }) {
  //   Task.belongsTo(Board);
  // };
  return Task;
};
