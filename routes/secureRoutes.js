const express = require('express');
const router = express.Router();
const db = require('../db');

const CheckIfAdmin = (req, res, next) => {
  
    if (req.user) {
        if (req.user.rooli === "admin") {
            next()
            return
        }
    }

    res.status(401).send("Unauthorized")
}

router.post('/loginToken', function (req, res) {

    let User


    if (req.user) {
        let tmpUser = req.user
        User = { id: tmpUser.id, rooli: tmpUser.rooli, käyttäjätunnus: tmpUser.käyttäjätunnus };
    }

    res.json({ User });
})




{//Tentti queryt

    //Hae tentti ID:llä
    router.get('/tentti/:id', (req, res) => {
        db.query('SELECT * FROM tentti WHERE id = $1', [req.params.id], (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    //Hae kaikki tentit
    router.get('/tentti/', (req, res) => {
        db.query('SELECT * FROM tentti ORDER BY id', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    //Poista tentti
    router.delete('/tentti/:id', CheckIfAdmin, (req, res) => {
        db.query('DELETE FROM tentti WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    //Muokkaa tenttiä
    router.put('/tentti/:id', CheckIfAdmin, (req, res) => {

        let nimi = req.body.nimi
        let minimipisteet = req.body.minimipisteet
        let SQLRequest = "UPDATE tentti SET nimi=$2, minimipisteet=$3 WHERE id = $1"

        db.query(SQLRequest, [req.params.id, nimi, minimipisteet], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })


    })

    //Julkaise tentti
    router.put('/julkaise/tentti/:id', CheckIfAdmin, (req, res) => {

        let SQLRequest = "UPDATE tentti SET julkaisuajankohta=now() WHERE id = $1"

        db.query(SQLRequest, [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })

    //Lue tentti
    router.post('/tentti/', CheckIfAdmin, (req, res) => {

        let nimi = req.body.nimi
        let minimipisteet = req.body.minimipisteet
        let SQLRequest = "INSERT INTO tentti(nimi, minimipisteet) VALUES ($1, $2) RETURNING id"

        db.query(SQLRequest, [nimi, minimipisteet], (err, result) => {

            if (err) {
                console.log(err)
                return
            }

            res.send(result.rows[0].id)
        })
    })
}

{//Tenttikysymykset

    //Poista kysymys tentistä
    router.delete('/tenttikysymys/:idtentti/kysymys/:idkysymys', CheckIfAdmin, (req, res) => {
        db.query('DELETE FROM tenttikysymys WHERE tentti_id = $1 AND kysymys_id = $2', [req.params.idtentti, req.params.idkysymys], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    //Hakee yhden kysymyksen kaikki tentit
    router.get('/kysymystentti/:idkysymys', CheckIfAdmin, (req, res) => {
        db.query('SELECT tentti_id FROM tenttikysymys WHERE kysymys_id = $1', [req.params.idkysymys], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    //Lisää kysymys tenttiin
    router.post('/tenttikysymys/', CheckIfAdmin, (req, res) => {



        let tentti_id = req.body.tentti_id
        let kysymys_id = req.body.kysymys_id

        let SQLRequest = "INSERT INTO tenttikysymys(tentti_id, kysymys_id) VALUES ($1, $2)"

        db.query(SQLRequest, [tentti_id, kysymys_id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })

    //Hakee yhden tentin kaikki kysymykset
    router.get('/tenttikysymys/:idtentti', (req, res) => {

        //TODO tarkista käyttöoikeus

        db.query('SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM tenttikysymys WHERE tentti_id = $1)', [req.params.idtentti], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)

        })
    })
}

{//Vastausvaihtoehdot

    router.delete('/vastausvaihtoehto/:id', (req, res) => {
        db.query('DELETE FROM vastausvaihtoehto WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    router.post('/vastausvaihtoehto/', (req, res) => {

        let vaihtoehto = req.body.vaihtoehto
        let oikea_vastaus = req.body.oikea_vastaus
        let kysymys_id = req.body.kysymys_id

        let SQLRequest = "INSERT INTO vastausvaihtoehto(vaihtoehto, oikea_vastaus, kysymys_id) VALUES ($1, $2, $3) RETURNING id"

        db.query(SQLRequest, [vaihtoehto, oikea_vastaus, kysymys_id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0].id)
        })
    })

    router.put('/vastausvaihtoehto/:id', (req, res) => {

        let vaihtoehto = req.body.vaihtoehto
        let oikea_vastaus = req.body.oikea_vastaus
        let SQLRequest = "UPDATE vastausvaihtoehto SET vaihtoehto=$1, oikea_vastaus=$2  WHERE id=$3"

        db.query(SQLRequest, [vaihtoehto, oikea_vastaus, req.params.id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })


}

{//Kysymykset

    router.delete('/kysymys/:id', (req, res) => {
        db.query('DELETE FROM kysymys WHERE id = $1', [req.params.id], (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    router.post('/kysymys/', (req, res) => {

        let kysymys = req.body.kysymys
        let aihe_id = req.body.aihe_id
        let SQLRequest = "INSERT INTO kysymys(kysymys, aihe_id) VALUES ($1, $2) RETURNING id"

        db.query(SQLRequest, [kysymys, aihe_id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0].id)
        })
    })

    router.put('/kysymys/:id', (req, res) => {

        let kysymys = req.body.kysymys
        let aihe_id = req.body.aihe_id
        let SQLRequest = "UPDATE kysymys SET kysymys=$1, aihe_id=$2 WHERE id=$3"

        db.query(SQLRequest, [kysymys, aihe_id, req.params.id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })

}



module.exports = router;