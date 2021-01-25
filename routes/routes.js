const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db');
const bcrypt = require('bcrypt')

const router = express.Router();
const BCRYPT_SALT_ROUNDS = 12;


router.post('/rekisteroi', (req, res) => {
    let käyttäjätunnus = req.body.käyttäjätunnus

    try {

        db.query('SELECT id FROM käyttäjä WHERE käyttäjätunnus = $1', [käyttäjätunnus], (err, result) => {

            if (err) {
                console.log(err)
            }
            if (result.rows.length > 0) {
                res.status(400)
                res.send('Registeration Failed')
            }
            else {

                bcrypt.hash(req.body.salasana, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

                    let salasana = hashedPassword
                    let rooli = "normal"

                    let SQLRequest = "INSERT INTO käyttäjä(käyttäjätunnus, salasana, rooli) VALUES ($1,$2,$3)"

                    db.query(SQLRequest, [käyttäjätunnus, salasana, rooli], (err, result) => {

                        if (err) {
                            console.log(err)
                            res.send('Adding User Failed')
                        }
                        else {
                            console.log(result)
                            res.send('Success')
                        }
                    })
                })
            }
        })

    }
    catch (err) {
        console.log(err)
        res.send('Adding User Failed')
    }
})

router.post('/login',

    async (req, res, next) => {

        passport.authenticate(
            'login',
            async (err, userFromDB, info) => {
                try {

                    if (err || !userFromDB) {

                        const error = new Error('An error occurred.');
                        res.status(401)
                        return res.send("Unauthorized")
                    }
                    
                    const user = { id: userFromDB.id, rooli: userFromDB.rooli, käyttäjätunnus: userFromDB.käyttäjätunnus };
                    const token = jwt.sign({ user: user }, 'secrets');
                    return res.json({ user, token });

                    /*
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
                        }
                    );
                    */

                } catch (error) {

                    return next(error);
                }
            }
        )(req, res, next);
    }
)

module.exports = router;