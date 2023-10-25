var express = require('express');
const { register, login, validateUser, getUserInfo, getAllUsers  } = require('./controller/userController');
const { jwtValidate } = require('../../utils/jwtValidate');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register)
router.post('/login', login)
router.get('/validate', jwtValidate, validateUser)
router.get('/user/:id', getUserInfo)
router.get('/all', getAllUsers)

module.exports = router;
