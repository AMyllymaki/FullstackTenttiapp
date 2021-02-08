const cors = require('cors')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');

require('./components/passport.js');

const routes = require('./routes/routes.js');
const secureRoutes = require('./routes/secureRoutes.js')
const normalUserRoutes = require('./routes/normalUserRoutes.js')

const passport = require('passport');

//Websocketit
const WebSocket = require('ws');

const app = express()

app.use(cors())

const port = process.env.PORT || 4000;
const server = require('http').createServer(app)
const wss = new WebSocket.Server({ server });
const db = require('./db');

app.use(express.static('./client/build'))
app.use(express.static('./admin/build'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/', routes);
app.use('/authenticated', passport.authenticate('loginToken', { session: false }), secureRoutes);
app.use('/user', passport.authenticate('loginToken', { session: false }), normalUserRoutes);


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

//remove this

app.get('/admin', (req, res) => {

    console.log("Loading From: " + __dirname + '/admin/build/index.html')

    res.sendFile(path.join(__dirname + '/admin/build/index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
