const express = require('express');
const router = express.Router();
const db = require('../db');


const CheckIfAdmin = (req) => {

    if (req.user) {
        if (req.user.rooli === "admin") {
            return true
        }
    }

    return false
}

//Tarkistetaan onko käyttäjällä oikeutta muuttaa tai lukea dataa (yrittääkö muuttaa oman tilinsä objekteja)
const CheckIfUsersMatch = (req, res, userID) => {

    let ReqAuth = req.headers.authorization

    let base64Token = ReqAuth.substring(ReqAuth.indexOf("."), ReqAuth.lastIndexOf("."))
    let buff = Buffer.from(base64Token, 'base64')

    let utf8Token = buff.toString('utf-8')
    let tokenJSON = JSON.parse(utf8Token)


    //Autentikaatiotokenin omistava käyttäjä ja käyttäjä johon muutos kohdistuu ovat samat
    if (tokenJSON.user.id === userID) {
        return true
    }

    res.status(401).send("Unauthorized")
    return false
}

//Muuta vastausta
router.put('/vastaus/:id', (req, res) => {

    //Haetaan vastaus kannasta ja tarkistetaan onko vastauksen "omistaja" tekemässä muutosta
    db.query('SELECT * FROM vastaus WHERE id = $1', [req.params.id], (err, result) => {

        if (err) {
            console.log(err)
        }
        else {
            if (!CheckIfUsersMatch(req, res, result.rows[0].käyttäjä_id)) return
        }
    })

    let tyyppi = req.body.tyyppi
    let SQLRequest = "UPDATE vastaus SET tyyppi=$1, vastauspäivämäärä=now() WHERE id=$2"

    db.query(SQLRequest, [tyyppi, req.params.id], (err, result) => {

        if (err) {
            console.log(err)
            return
        }
        res.send(result.rows[0])
    })
})

//Lisää vastaus
router.post('/vastaus/', (req, res) => {

    let tyyppi = req.body.tyyppi
    let vaihtoehto_id = req.body.vaihtoehto_id
    let käyttäjä_id = req.body.käyttäjä_id


    //Tarkistetaan että käyttäjä on lisäämässä vastausta itselleen
    if (!CheckIfUsersMatch(req, res, käyttäjä_id)) return

    let SQLRequest = "INSERT INTO vastaus(tyyppi, vaihtoehto_id, käyttäjä_id, vastauspäivämäärä) VALUES ($1, $2, $3, now()) RETURNING id, vastauspäivämäärä"

    db.query(SQLRequest, [tyyppi, vaihtoehto_id, käyttäjä_id], (err, result) => {


        if (err) {
            console.log(err)
            return
        }

        res.send(result.rows[0])
    })
})

//Hae yhden käyttäjän kaikki vastaukset yhteen tenttiin
router.get('/vastaus/kayttaja/:kayttaja_id/tentti/:tentti_id', (req, res) => {

    //Jos ei Admin: Tarkistetaan että käyttäjä on hakemassa tenttejä itselleen
    if (!CheckIfAdmin(req)) {
        if (!CheckIfUsersMatch(req, res, req.params.kayttaja_id)) return
    }

    let SQLRequest = 'SELECT * FROM vastaus WHERE käyttäjä_id=$1 AND vaihtoehto_id IN (SELECT id FROM vastausvaihtoehto WHERE kysymys_id IN(SELECT id FROM kysymys WHERE id IN (SELECT kysymys_id FROM tenttikysymys WHERE tentti_id = $2)))'

    db.query(SQLRequest, [req.params.kayttaja_id, req.params.tentti_id], (err, result) => {

        if (err) {
            console.log(err)
            return
        }
        res.send(result.rows)
    })
})

//Hae kysymyksen vastausvaihtoehdot
router.get('/vastausvaihtoehto/kysymys/:id', (req, res) => {

    

    db.query('SELECT * FROM vastausvaihtoehto WHERE kysymys_id =$1 ORDER BY id', [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result.rows)
    })
})

module.exports = router;