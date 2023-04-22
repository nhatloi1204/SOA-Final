const router = require('express').Router();
const { requireAuth } = require('../middleware/authenticatedCheck');

router.get('/', function (req, res) {
    res.json('welcome to admin page');
});

module.exports = router;
