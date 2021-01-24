const router = require('express').Router();
const method = require('../controller/product-controller');

router.get('/count', method.countMethod)

router.get('/', method.getMethod)

router.get('/:id', method.singleGet)

router.post('/', method.postMethod);

router.patch('/:id', method.patchMethod);

router.delete('/:id', method.deleteMethod)

module.exports = router;