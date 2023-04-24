const router = require('express').Router();
const { adminRequireAuth } = require('../middleware/authenticatedCheck');
const { adminControllers } = require('../controllers');

router.get('/', adminControllers.loginPage);
router.post('/login', adminControllers.login);

//! middleware will only protect these below routes
router.use(adminRequireAuth);

router.get('/dashboard', adminControllers.homePage);

router.get('/dashboard/posts', adminControllers.postPage);

router.get('/dashboard/tags', adminControllers.tagPage);

router.get('/dashboard/users', adminControllers.userPage);

router.get('/dashboard/staffs', adminControllers.staffPage);

router.post('/tags', adminControllers.createTag);

router.put('/post/:id/approval', adminControllers.updateApproveStatus);

module.exports = router;
