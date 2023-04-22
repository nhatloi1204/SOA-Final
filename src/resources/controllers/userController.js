require('dotenv').config();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10h' });
};

const homePage = async (req, res) => {
    try {
        return res.render('home');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const loginPage = async (req, res) => {
    res.render('login');
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).json('incorrect email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(500).json('Incorrect password');
        }

        const token = createToken(user);
        req.user = user;
        req.token = token;

        console.log(req.user, req.token);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const registerPage = async (req, res) => {
    res.render('register');
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
        // console.log(req.user);
        return res.render('profile', { user: req.user });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const changePassPage = async (req, res) => {
    try {
        return res.render('changePass');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const detailPostPage = async (req, res) => {
    try {
        return res.render('detailPost');
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
    detailPostPage,
};
