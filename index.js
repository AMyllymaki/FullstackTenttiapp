const cors = require('cors')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');

require('./components/passport.js');
const routes = require('./routes/routes.js');
const secureRoutes = require('./routes/secureRoutes.js')

const passport = require('passport');



//Websocketit
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 2356 });


const app = express()

const port = process.env.PORT || 4000;

const db = require('./db');

app.use(express.static('./client/build'))
app.use(express.static('./admin/build'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors())

app.use('/', routes);
app.use('/authenticated', passport.authenticate('loginToken', { session: false }), secureRoutes);



//Tämä osio ei toimi herokussa tällä hetkellä (Websocketit)
var pg = require('pg');

let con_string = process.env.DATABASE_URL || 'tcp://postgres:admin@localhost/Tenttikanta'


let pg_client = new pg.Client(con_string)
pg_client.connect()
pg_client.query('LISTEN inserttentti')
pg_client.query('LISTEN insertkysymys')
pg_client.query('LISTEN insertvastausvaihtoehto')
pg_client.query('LISTEN deletetentti')
pg_client.query('LISTEN deletekysymys')
pg_client.query('LISTEN deletevastausvaihtoehto')

wss.on('connection', function connection(ws) {

    pg_client.on('notification', function (nimi) {

        if (pg_client === ws) {

        }

        ws.send(nimi.payload);

    })
    console.log("Someone connected")
})


//TODO

//Käytettävien komponenttien muodostaminen serverillä useammalla haulla?

//Nodesta ei nyt lähde erroreita

//Saman kysymyksen lisääminen tenttiin kaataa asioita (sama muissa liitostauluissa myöhemmin)


{//Kurssi queryt
    app.delete('/kurssi/:id', (req, res) => {
        db.query('DELETE FROM kurssi WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/kurssi/:id', (req, res) => {
        db.query('SELECT * FROM kurssi WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/kurssi/', (req, res) => {
        db.query('SELECT * FROM kurssi', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/kurssi/', (req, res) => {

        let kurssi = req.body.kurssi

        let SQLRequest = "INSERT INTO kurssi(kurssi) VALUES ($1)"

        db.query(SQLRequest, [kurssi], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Aihe queryt
    app.delete('/aihe/:id', (req, res) => {
        db.query('DELETE FROM aihe WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/aihe/:id', (req, res) => {
        db.query('SELECT * FROM aihe WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/aihe/', (req, res) => {
        db.query('SELECT * FROM aihe', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/aihe/', (req, res) => {

        let aihe = req.body.aihe
        let SQLRequest = "INSERT INTO aihe(aihe) VALUES ($1)"

        db.query(SQLRequest, [aihe], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })


    app.put('/aihe/:id', (req, res) => {

        let aihe = req.body.aihe
        let SQLRequest = "UPDATE aihe SET aihe=$1 WHERE id=$2"

        db.query(SQLRequest, [aihe, req.params.id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Vastausvaihtoehto queryt

    //Hae vastausvaihtoehto ID:llä
    app.get('/vastausvaihtoehto/:id', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    //Hae kaikki vastausvaihtoehdot
    app.get('/vastausvaihtoehto/', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto ORDER BY id', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    //Hae kysymyksen vastausvaihtoehdot
    app.get('/vastausvaihtoehto/kysymys/:id', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto WHERE kysymys_id =$1 ORDER BY id', [req.params.id], (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })


}

{//Vastaus queryt

    //Hae vastaus ID:llä
    app.get('/vastaus/:id', (req, res) => {
        db.query('SELECT * FROM vastaus WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    //Hae kaikki vastaukset
    app.get('/vastaus/', (req, res) => {
        db.query('SELECT * FROM vastaus', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    //Hae yhden käyttäjän kaikki vastaukset yhteen tenttiin
    app.get('/vastaus/kayttaja/:kayttaja_id/tentti/:tentti_id', (req, res) => {
        let SQLRequest = 'SELECT * FROM vastaus WHERE käyttäjä_id=$1 AND vaihtoehto_id IN (SELECT id FROM vastausvaihtoehto WHERE kysymys_id IN(SELECT id FROM kysymys WHERE id IN (SELECT kysymys_id FROM tenttikysymys WHERE tentti_id = $2)))'

        db.query(SQLRequest, [req.params.kayttaja_id, req.params.tentti_id], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows)
        })
    })

    //Lisää vastaus
    app.post('/vastaus/', (req, res) => {

        let tyyppi = req.body.tyyppi
        let vaihtoehto_id = req.body.vaihtoehto_id
        let käyttäjä_id = req.body.käyttäjä_id


        let SQLRequest = "INSERT INTO vastaus(tyyppi, vaihtoehto_id, käyttäjä_id, vastauspäivämäärä) VALUES ($1, $2, $3, now()) RETURNING id, vastauspäivämäärä"

        db.query(SQLRequest, [tyyppi, vaihtoehto_id, käyttäjä_id], (err, result) => {


            if (err) {
                console.log(err)
                return
            }

            res.send(result.rows[0])
        })
    })

    //Muuta vastausta
    app.put('/vastaus/:id', (req, res) => {

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
}

{//Kysymys queryt

    //Hae kysymys ID:llä
    app.get('/kysymys/:id', (req, res) => {
        db.query('SELECT * FROM kysymys WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    //Hae kaikki kysymykset
    app.get('/kysymys/', (req, res) => {
        db.query('SELECT * FROM kysymys', (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })


}




app.get('/admin', (req, res) => {

    console.log("Loading From: " + __dirname + '/admin/build/index.html')

    res.sendFile(path.join(__dirname + '/admin/build/index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
