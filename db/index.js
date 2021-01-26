const { Pool } = require('pg')

let connectionInfo = {}

//process.env.HEROKU

if (true) {
  connectionInfo = process.env.DATABASE_URL
}
else {
  connectionInfo =
  {
    user: 'postgres',
    host: 'localhost',
    database: 'Tenttikanta',
    password: 'admin',
    port: 5432,
  }

}

const pool = new Pool(connectionInfo)

module.exports = {
  query: (text, params, callback) => {

    return pool.query(text, params, callback)
  },

  client: () => {
    return pool.client()
  }
}