const { Pool } = require('pg')

let pool

if (process.env.HEROKU) {
  console.log("Process is HEROKU")
  pool = new Pool({ connectionString: process.env.DATABASE_URL })
}
else if (process.env.AZURE) {
  console.log("Process is AZURE")
  pool = new Pool({

    host: "tenttipostgres.postgres.database.azure.com",
    user: "TenttiAdmin@tenttipostgres",
    password: process.env.AZURE_DB_PASSWORD,
    database: 'Tenttikanta',
    port: 5432,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      "ssl": {"require":true }
    }

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