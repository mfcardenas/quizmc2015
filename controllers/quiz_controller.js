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

//GET /quizes/new create pregunta
exports.new = function(req, res){
  var quiz = models.Quiz.build(
    {pregunta: "", respuesta: ""}
  );

  res.render('quizes/new',{quiz:quiz, errors:[]});
};


exports.index = function(req, res){
  var buscar = (req.query.buscar || '');
  if(buscar != null && buscar != ''){
    models.Quiz.findAll({where: ["pregunta like ?", '%' + buscar + '%']}).then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, buscar: buscar, errors:[]});
    });
  }else{
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, buscar: buscar, errors:[]});
    })
  }

}

//GET quiz for Id
exports.show = function(req, res){
  //models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: req.quiz, errors:[]});
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
    res.render('quizes/answer',{quiz: req.quiz, respuesta: strResp, errors:[]});
  //});
}

//GET Autors
exports.autors = function(req, res){
  res.render('autors', { autor: 'Marlon Cárdenas', errors: [] });
}

//Editar
exports.edit = function(req, res){
  var quiz = req.quiz;
  res.render('quizes/edit',{quiz:quiz, errors:[]});
}

//DELETE /quizes/:id
exports.destroy = function(req, res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
}

//POST Create Pregunta /quizes/create
exports.create_old = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);
  quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz:quiz, errors: err.errors});
      }else{
        //Se guarda en BD la pregunta y su respuesta
        quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
            //se redirecciona al listado de preguntas para ver la nueva.
            res.redirect('/quizes');
        });
      }
    });
};

exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );

  var errors = quiz.validate();//ya qe el objeto errors no tiene then(
  if (errors){
    var i=0; var errores = new Array();//se convierte en [] con la propiedad message por compatibilida con layout
    for (var prop in errors) errores[i++] = {message: errors[prop]};
    res.render('quizes/new', {quiz: quiz, errors: errores});
  } else {
    quiz // save: guarda en DB campos pregunta y respuesta de quiz
    .save({fields: ["pregunta", "respuesta"]})
    .then( function(){ res.redirect('/quizes')}) ;
  }
};

//PUT Update Pregunta /quizes/update
exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/edit', {quiz:req.quiz, errors: err.errors});
      }else{
        //Se guarda en BD la pregunta y su respuesta
        req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
            //se redirecciona al listado de preguntas para ver la nueva.
            res.redirect('/quizes');
        });
      }
    });
};
