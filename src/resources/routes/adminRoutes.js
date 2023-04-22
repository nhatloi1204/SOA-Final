const router = require('express').Router();
const { requireAuth } = require('../middleware/authenticatedCheck');

router.get('/', function (req, res) {
    res.render('admin', { layout: 'admin' });
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', { layout: 'admin' });
});

module.exports = router;
