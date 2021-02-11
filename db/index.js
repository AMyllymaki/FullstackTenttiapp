const { Pool } = require('pg')

let pool

if (process.env.HEROKU) {
  console.log("Process is HEROKU")
  pool = new Pool({ connectionString: process.env.DATABASE_URL })
}
else if (process.env.AZURE) {
  console.log("Process is AZURE")
  pool = new Pool({

    user: 'TenttiAdmin@tenttipostgres',
    host: 'tenttipostgres.postgres.database.azure.com',
    database: 'Tenttikanta',
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: true,
  })
}
else {
  console.log("Process is LOCAL")

  
  pool = new Pool({

   user: 'postgres',
   host: 'localhost',
   database: 'Tenttikanta',
   password: process.env.LOCAL_DB_PASSWORD,
   port: 5432,
  })

}

module.exports = {
  query: (text, params, callback) => {

    return pool.query(text, params, callback)
  },

  client: () => {
    return pool.client()
  }
}