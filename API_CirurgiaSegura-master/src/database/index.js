/* conexão com banco de dados */
const { Pool } = require('pg');

/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_cirurgia',
  password: 'postgres',
  port: 5432,
});
pool.connect(function (err){
  if(err)
      console.log(err);
  else
      console.log("Connected!");
});*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
  pool,
};
