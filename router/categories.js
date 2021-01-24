const router = require('express').Router();

router.get('/count', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {
  console.log(req.param.id)
})

router.post('/', (req, res) => {

})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;
