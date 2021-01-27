const router = require('express').Router();
const method = require('../controller/user-controller');
const auth = require('../midleware/authMiddle');

router.get('/count', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/me', method.getMeUser);

router.get('/:id', (req, res) => {
  console.log(req.param.id)
})

router.post('/', (req, res) => {

})

router.post('/register', method.registerMethod)

router.post('/login', method.loginMethod)

router.post('/logout', method.logoutMethod)

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;