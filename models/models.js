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
sequelize.sync().then( function(){
  Quiz.count().success(function(count){
    if(count === 0){
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Chile',
        respuesta: 'Santiago',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Rusia',
        respuesta: 'Moscu',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Mexico',
        respuesta: 'Mexico',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Reino Unido',
        respuesta: 'Londres',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Portugal',
        respuesta: 'Lisboa',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Alemania',
        respuesta: 'Berlin',
        tema: 'humanidades'
      });
      Quiz.create({
        pregunta: 'Capital de Argentina',
        respuesta: 'Buenos Aires',
        tema: 'humanidades'
      }).success(function(){
        console.log('Base de datos Inicializada');
      });
    };
  });
});
