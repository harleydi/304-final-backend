var express = require('express');
const { register, login, validateUser } = require('./controller/userController');
const { jwtValidate } = require('../../utils/jwtValidate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register)
router.post('/login', login)
router.get('/validate', jwtValidate, validateUser)

module.exports = router;
