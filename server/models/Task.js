module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    text: DataTypes.STRING
  });
  Task.associate = function({ Board }) {
    Task.belongsTo(Board);
  };
  return Task;
};
