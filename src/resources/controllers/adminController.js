const adminModel = require('../models/employeeModel');
const userModel = require('../models/userModel');
const tagModel = require('../models/categoryModel');
const postModel = require('../models/postModel');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10h' });
};

const loginPage = async (req, res) => {
    try {
        res.render('admin/login', { layout: 'admin' });
    } catch (error) {
        res.render('505page');
    }
};

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await adminModel.findOne({ name, password }).lean();
        if (!user) {
            return res.status(500).json('incorrect user name or password 😢');
        }

        const token = createToken(user);

        //! JWT will useful for protecting API
        //! In term of browser, we only need req.session.user
        req.session.token = token;
        req.session.user = user;

        console.log(req.session.user, req.session.token);

        return res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const homePage = async (req, res) => {
    //! list everything in this page
    try {
        return res.render('admin/home', { layout: 'admin', user: req.session.user });
    } catch (error) {
        res.status(500).render('505page');
    }
};

const postPage = async (req, res) => {
    try {
        return res.status(200).render('admin/posts', { layout: 'admin' });
    } catch (error) {
        res.status(500).render('505page');
    }
};

const staffPage = async (req, res) => {
    try {
        return res.status(200).render('admin/staffs', { layout: 'admin' });
    } catch (error) {
        res.status(500).render('505page');
    }
};

const tagPage = async (req, res) => {
    try {
        return res.status(200).render('admin/tags', { layout: 'admin' });
    } catch (error) {
        res.status(500).render('505page');
    }
};

const userPage = async (req, res) => {
    try {
        return res.status(200).render('admin/users', { layout: 'admin' });
    } catch (error) {
        res.status(500).render('505page');
    }
};

const createTag = async (req, res) => {
    try {
        const { category } = req.body;
        await tagModel.create({ category });
        return res.status(200).json('create new tags successfully 🥰');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updateApproveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.query.approval;
        const data = await postModel.findByIdAndUpdate(id, { approval: status }, { new: true });
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    loginPage,
    login,
    homePage,
    postPage,
    staffPage,
    tagPage,
    userPage,
    createTag,
    updateApproveStatus,
};
