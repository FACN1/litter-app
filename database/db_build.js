const fs = require('fs');
const dbConnection = require('./db_connect.js');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {

  if (err) return console.log(err);

  console.log('BLUKU! Database build was successful');
});
