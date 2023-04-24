const router = require('express').Router();
const { userControllers } = require('../controllers');
const passport = require('passport');
const { requireAuth } = require('../middleware/authenticatedCheck');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10h' });
};

//* google authentication
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'openid'],
    }),
);

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const token = createToken(req.user);
    req.session.token = token;
    req.session.user = req.user;
    res.redirect('/');
});

router.get('/page/login', userControllers.loginPage);
router.post('/login', userControllers.login);

router.get('/page/register', userControllers.registerPage);
router.post('/register', userControllers.register);

router.get('/', userControllers.homePage);

router.use(requireAuth);

router.get('/page/profile', userControllers.profilePage);

//! router.get('page/changePass', userControllers.changePassPage);

router.get('/page/new-story', userControllers.newStoryPage);
router.post('/publish', userControllers.publishPost);

router.get('/page/:userID/saved', userControllers.bookmarkedPage);
router.get('/page/:userID/following', userControllers.followUserPage);
router.get('/:ownerName/:postTitle', userControllers.getSinglePost);


module.exports = router;
