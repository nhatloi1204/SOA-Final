const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const port = 3000;

app.engine(
    'hbs',
    hbs.engine({
        extname: 'hbs',
        helpers: {},
    }),
);

app.get('/', function (req, res) {
    return res.render('home', { layout: 'main' });
});

app.get('/login', function (req, res) {
    return res.render('login', { layout: 'main' });
});

app.get('/register', function (req, res) {
    return res.render('register', { layout: 'main' });
});

app.get('/admin', function (req, res) {
    return res.render('admin', { layout: 'main' });
});

app.get('/detailPost', function (req, res) {
    return res.render('detailPost', { layout: 'main' });
});

app.get('/profile', function (req, res) {
    return res.render('profile', { layout: 'main' });
});

app.get('/changePass', function (req, res) {
    return res.render('changePass', { layout: 'main' });
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`
              Example app listening on http://localhost:${port}
              `);
});
