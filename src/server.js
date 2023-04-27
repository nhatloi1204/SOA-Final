require('dotenv').config();
require('./configs/passport-setup');
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const { userRoutes, adminRoutes } = require('./resources/routes');

//* middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    }),
);
app.use(
    session({
        secret: process.env.cookieKey,
        cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

//* Template Engine
app.engine(
    'hbs',
    hbs.engine({
        extname: 'hbs',
        helpers: {
            //* increasing index by 1 (default start with 0)
            increaseIndexByOne: (index) => index + 1,

            //* formatting currency to dollar
            formatCurrency: (price) => {
                if (price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' $';
            },

            //* formatting date base on US style
            formatDate: (date) => {
                return new Intl.DateTimeFormat('en-us', { dateStyle: 'short', timeStyle: 'short' }).format(date);
            },

            //* transform post title
            transformTitle: (options) => {
                if (options) {
                    const title = options.hash.title.replace(' ', '-');
                    const name = options.hash.name.replace(' ', '-');
                    return `http://localhost:3000/${name}/${title}`;
                }
            },
        },
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//* Routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes);

//* Start server
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connect database successfully`);
            console.log(`listening on PORT ${process.env.PORT}...`);
            console.log(`http://localhost:${process.env.PORT}/`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
