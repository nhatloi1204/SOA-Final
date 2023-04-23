const router = require('express').Router();
const { requireAuth } = require('../middleware/authenticatedCheck');
const { adminControllers } = require('../controllers');

router.get('/', adminControllers.loginPage);

router.get('/dashboard', adminControllers.homePage);

module.exports = router;
