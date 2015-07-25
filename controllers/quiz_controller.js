//GET /quizes/question
var models = require('../models/models.js');

// Funcion Autoload, factoriza el código si ruta incluye un idQuiz
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }else{
        next(new Error('No existe el idQuiz: ' + quizId));
      }
    }
  ).catch (function(error){next(error);});
}

//no se usa
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/question', {pregunta: quiz[0].pregunta});
  })
  //res.render('quizes/question', {pregunta: 'Capital de Italia'});
}


exports.index = function(req, res){
  var buscar = (req.query.buscar || '');
  if(buscar != null && buscar != ''){
    models.Quiz.findAll({where: ["pregunta like ?", '%' + buscar + '%']}).then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, buscar: buscar});
    });
  }else{
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, buscar: buscar});
    })
  }

}

//GET quiz for Id
exports.show = function(req, res){
  //models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: req.quiz});
  //});
};

//GET /quizes/answer
//no se usa
exports.answerOld = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    if(req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer',{respuesta: 'Correcto'});
    }else{
      res.render('quizes/answer',{respuesta: 'Incorrecto'});
    }
  });
}

exports.answer = function(req, res){
  //models.Quiz.find(req.params.quizId).then(function(quiz){
    var strResp = "Incorrecto";
    if(req.query.respuesta === req.quiz.respuesta){
      strResp = 'Correcto';
    }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: strResp});
  //});
}

//GET Autors
exports.autors = function(req, res){
  res.render('autors', { autor: 'Marlon Cárdenas' });
}
