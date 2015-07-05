var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Mc' });
});

router.get('/quiz/question',quizController.question);
router.get('/quiz/answer',quizController.answer);

module.exports = router;
