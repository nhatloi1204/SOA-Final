require('dotenv').config();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const bookmarkPostModel = require('../models/bookmarkPostModel');
const commentModel = require('../models/commentsModel');
const jwt = require('jsonwebtoken');
const followUserModel = require('../models/followUserModel');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10h' });
};

const homePage = async (req, res) => {
    try {
        return res.render('user/home', {user: req.session.user});
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const loginPage = async (req, res) => {
    res.render('user/login');
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).lean();
        if (!user) {
            return res.status(500).json('incorrect email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(500).json('Incorrect password');
        }

        const token = createToken(user);
        req.session.user = user;
        req.session.token = token;

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const registerPage = async (req, res) => {
    res.render('user/register');
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //* encrypted password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, email, password: hash });
        const token = createToken(user);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const profilePage = async (req, res) => {
    try {
        return res.render('user/profile', { user: req.session.user });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const changePassPage = async (req, res) => {
    try {
        return res.render('user/changePass');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const newStoryPage = async (req, res) => {
    try {
        return res.render('user/story');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getSinglePost = async (req, res) => {
    //! once access this page, we will make two API calls
    //! one to get post's content and one to get all comments of that post
    //! by take the ID of the first result the take it and populate in comment db
    try {
        const { ownerName, postTitle } = req.query;
        const post = await postModel.findOne({ name: ownerName, title: postTitle }).lean();
        const comments = await commentModel.find({ postID: post._id }).populate('postID').lean();
        return res.status(200).json(post, comments);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const publishPost = async (req, res) => {
    //! remember to make the title lowercase
    //! so we can find it in db using req.query
    try {
        const { owner, title, category, content, thumbnail } = req.body;
        const data = await postModel.create({ owner, title, category, content, thumbnail });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const postComment = async (req, res) => {
    try {
        const { commentatorID, postID, content } = req.body;
        await commentModel.create({ commentatorID, postID, content });
        return res.status(200).json('post comment successfully ♥');
    } catch (error) {}
};

const bookmarkedPage = async (req, res) => {
    try {
        const userID = req.query.userID;
        await bookmarkPostModel.find({ userID }).populate('postID').lean();
        return res.status(200).render('user/bookmark')
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const followUserPage = async (req, res) => {
    try {
        const userID = req.query.userID;
        await followUserModel.find({ userID }).populate('postID').lean();
        return res.status(200).render('user/follow')
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const postFollowingUser = async (req, res) => {
    try {
        const { userID, followUserID } = req.body;
        await followUserModel.create({ userID, followUserID });
        return res.status(200).json('post following successfully ♥');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updatePostLike = async (req, res) => {
    try {
        const id = req.params;
        await postModel.findByIdAndUpdate(id, { like: like + 1 });
        return res.status(200).json('update like number successfully ♥');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    loginPage,
    login,
    registerPage,
    register,
    profilePage,
    changePassPage,
    newStoryPage,
    getSinglePost,
    publishPost,
    postComment,
    bookmarkedPage,
    followUserPage,
    postFollowingUser,
    updatePostLike,
};
