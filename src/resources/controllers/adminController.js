const loginPage = async (req, res) => {
    res.render('admin/login', { layout: 'admin' });
};

const homePage = async (req, res) => {
    res.render('admin/home', { layout: 'admin' });
};

module.exports = {
    loginPage,
    homePage,
};
