module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define("Board", {
    text: DataTypes.STRING
  });
  // Board.associate = function({ Task }) {
  //   Board.hasMany(Task, {
  //     onDelete: "cascade"
  //   });
  // };
  return Board;
};
