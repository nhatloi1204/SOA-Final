const router = require('express').Router();
const { userControllers } = require('../controllers');

router.get('/', userControllers.homePage);

router.get('/login', userControllers.login);

router.get('/register', userControllers.register);

router.get('/profile', userControllers.profile);

router.get('/changePass', userControllers.changePass);

router.get('/detailPost', userControllers.detailPost);

module.exports = router;
