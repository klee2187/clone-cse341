const router = require('express').Router();
const temples = require('../controllers/temple.js');

router.get('/', temples.findAll);
router.get('/:temple_id', temples.findOne);

router.post('/', temples.create);

module.exports = router;
