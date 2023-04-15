require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const { userRoutes, adminRoutes } = require('./resources/routes');

//* middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//* Template Engine
app.engine(
    'hbs',
    hbs.engine({
        extname: 'hbs',
        helpers: {},
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//* Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

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
