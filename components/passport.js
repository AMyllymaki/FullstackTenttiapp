const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt')
const db = require('../db');

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'käyttäjätunnus',
            passwordField: 'salasana',
            session: false
        },
        (username, password, done) => {
            try {

                db.query('SELECT * FROM käyttäjä WHERE käyttäjätunnus = $1', [username], (err, result) => {

                    if (err) {
                        console.log(err)
                    }

                    if (result.rows.length === 0) {
                        return done(null, false, { message: 'bad username' });
                    }

                    if (result.rows.length > 0) {

                        let user = result.rows[0]

                        bcrypt.compare(password, user.salasana).then(response => {
                            if (response !== true) {
                                console.log('passwords do not match');
                                return done(null, false, { message: 'passwords do not match' });
                            }

                            console.log('user found!');
                            return done(null, user);
                        })
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secrets'
};

passport.use(
    'loginToken',
    new JWTstrategy(opts, (jwt_payload, done) => {

        try {

            if (jwt_payload) {

                db.query('SELECT * FROM käyttäjä WHERE id = $1', [jwt_payload.user.id], (err, result) => {

                    if (err) {
                        console.log(err)
                        done(null, false);
                    }

                    if (result.rows.length === 0) {

                        return done(null, false, { message: "user doesn't exist" });
                    }

                    if (result.rows.length > 0) {

                        let user = result.rows[0]

                        if (user) {
                            done(null, user);
                        }
                    }
                })
            }
            else {
                done(null, false);
            }

        } catch (err) {
            done(err);
        }
    }),
)