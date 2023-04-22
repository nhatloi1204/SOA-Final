require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// * used for people who authenticated by Google
const authCheck = (req, res, next) => {
    console.log(req.first, req.second);
    if (!req.first) {
        console.log('false');
        res.redirect('/page/login');
    } else {
        console.log('true');
        next();
    }
};

// * used for people who authenticated by Email and Password
const requireAuth = async (req, res, next) => {
    if (!req.user) {
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

module.exports = {
    authCheck,
    requireAuth,
};
