const adminModel = require('../models/employeeModel');
const userModel = require('../models/userModel');
const tagModel = require('../models/categoryModel');
const postModel = require('../models/postModel');

const loginPage = async (req, res) => {
    try {
        res.render('/admin/login');
    } catch (error) {
        res.render('/505page');
    }
};

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await adminModel.findOne({ name, password }).lean();
        if (!user) {
            return res.status(500).json('incorrect user name or password 😢');
        }
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const homePage = async (req, res) => {
    //! list everything in this page
    try {
        const userAccounts = await userModel.find({}).lean();
        const adminAccounts = await adminModel.find({}).lean();
        const tags = await tagModel.find({}).lean();
        const posts = await postModel.find({ approval: false }).lean();
        return res.render('admin/home', { userAccounts, adminAccounts, tags, posts });
    } catch (error) {
        res.status(500).json(error.message);
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
    createTag,
    updateApproveStatus,
};
