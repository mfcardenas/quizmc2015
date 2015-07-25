var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6] || null);
var user      = (url[2] || null);
var pwd       = (url[3] || null);
var protocol  = (url[1] || null);
var dialect   = (url[1] || null);
var port      = (url[5] || null);
var host      = (url[4] || null);
var storage   = process.env.DATABASE_STORAGE;
//Definir el modelo ORM
var Sequelize = require('sequelize');

//Crear conexión a SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
                        {
                          dialect: dialect,
                          storage: storage,       //Mio: SQLite (.env)
                          protocol: protocol,
                          port: port,
                          host: host,
                          omitNull: true          //Mio: postgres
                        }
                    );


//var sequelize = new Sequelize(null, null, null,
//                        {dialect: 'sqlite', storage: "quiz.sqlite"}
//                    );

//Importar la estructura de la tabla quiz definida en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
//Exportar definición de la tabla
exports.Quiz = Quiz;

//Esta función crea la BD con las preguntas indicadas
sequelize.sync().success( function(){
  Quiz.count().success(function(count){
    if(count === 0){
      Quiz.create({
        pregunta: 'Capital de España',
        respuesta: 'Madrid'
      }).success(function(){
        console.log('Base de datos Inicializada');
      });
    };
  });
});
