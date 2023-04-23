const router = require('express').Router();
// const { requireAuth } = require('../middleware/authenticatedCheck');
const { adminControllers } = require('../controllers');

router.get('/', adminControllers.loginPage);
router.post('/login', adminControllers.login);

router.get('/dashboard', adminControllers.homePage);

router.post('/tags', adminControllers.createTag);

router.put('/post/:id/approval', adminControllers.updateApproveStatus);

module.exports = router;
