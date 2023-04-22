require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../resources/models/userModel');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            // * options for Google Strategy
            callbackURL: '/auth/google/redirect',
            clientID: process.env.ClientID,
            clientSecret: process.env.ClientSecret,
        },
        (accessToken, refreshToken, profile, next) => {
            // * callback here
            const email = profile._json.email;
            userModel.findOne({ email }).then((result) => {
                if (result) {
                    next(null, result);
                } else {
                    new userModel({
                        name: profile._json.name,
                        email,
                        image: profile._json.picture,
                    })
                        .save()
                        .then((newUser) => {
                            next(null, newUser);
                        });
                }
            });
        },
    ),
);
