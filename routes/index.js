const express = require('express');
const router = express.Router();
const app = require('../app')
const userRouter = require('./user')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
