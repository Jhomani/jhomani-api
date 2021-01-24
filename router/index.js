const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('explore');
})

module.exports = router;