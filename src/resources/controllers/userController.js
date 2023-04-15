const homePage = async (req, res) => {
    try {
        return res.render('home');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const login = async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const register = async (req, res) => {
    try {
        return res.render('register');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const profile = async (req, res) => {
    try {
        return res.render('profile');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const changePass = async (req, res) => {
    try {
        return res.render('changePass');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const detailPost = async (req, res) => {
    try {
        return res.render('detailPost');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    login,
    register,
    profile,
    changePass,
    detailPost,
};
