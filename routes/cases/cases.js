var express = require('express');
const { createCase, getAll } = require('./controller/caseController');
const { jwtValidate } = require('../../utils/jwtValidate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', jwtValidate, createCase)
router.get('/all', getAll)

module.exports = router;