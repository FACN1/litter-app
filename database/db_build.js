const fs = require('fs');
const dbConnection = require('./db_connect.js');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err) => {
  if (err) return console.log(err);

  return console.log('BLUKU! Database build was successful');
});
