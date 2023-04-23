const router = require('express').Router();
const { userControllers } = require('../controllers');
const passport = require('passport');
const { requireAuth } = require('../middleware/authenticatedCheck');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10h' });
};

router.get('/', userControllers.homePage);

router.get('/page/login', userControllers.loginPage);
router.post('/login', userControllers.login);

router.get('/page/register', userControllers.registerPage);
router.post('/register', userControllers.register);

router.get('/page/profile', requireAuth, userControllers.profilePage);

router.get('page/changePass', userControllers.changePassPage);

router.get('/page/new-story', userControllers.newStoryPage);
router.get('/:ownerName/:postTitle', userControllers.getSinglePost);
router.post('/publish', requireAuth, userControllers.publishPost);

router.get('/:userID/saved', userControllers.getBookmarkedPost);
router.get('/:userID/following', userControllers.getFollowingUser);

//* google authentication
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'openid'],
    }),
);

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const token = createToken(req.user);
    req.token = token;
    console.log(req.token);
    res.redirect('/');
});

module.exports = router;
