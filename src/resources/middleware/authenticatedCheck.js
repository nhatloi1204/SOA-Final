require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// * used for people who is authenticated as User
const requireAuth = async (req, res, next) => {
    if (!req.session.user) {
        const { authorization } = req.headers;

        if (!authorization) return res.redirect('/page/login');

        const token = authorization.split(' ')[1];

        try {
            const { _id } = jwt.verify(token, process.env.SECRET);
            req.user = await userModel.findOne({ _id }).select('_id');
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json('Request is not authorized');
        }
    } else {
        next();
    }
};
// * used for people who is authenticated as Admin or Staff
const adminRequireAuth = async (req, res, next) => {
    if (!req.session.user) {
        return res.render('admin/login', { layout: 'admin' });
    } else {
        next();
    }
};

module.exports = {
    requireAuth,
    adminRequireAuth,
};
