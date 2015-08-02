//Definir el modelo de Quiz

module.exports = function(sequelize, DataTypes){
  return sequelize.define('Quiz',
          { pregunta: {
              type: DataTypes.STRING,
              validate: {notEmpty: {msg: "-> Indique la pregunta"}}
            },
            respuesta: {
              type: DataTypes.STRING,
              validate: {notEmpty: {msg: "-> Indique la respuesta"}}
            },
            tema: {
              type: DataTypes.STRING,
              validate: {notEmpty: {msg: "-> Indique el tema"}}
            }
          });
}
