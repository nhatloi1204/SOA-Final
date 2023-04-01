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

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`
              Example app listening on http://localhost:${port}
              `);
});
