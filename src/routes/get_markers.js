const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');

module.exports = {
  method: 'GET',
  path: '/get-markers',
  handler: (request, reply) => {
    dbQueries.getMarkers(connPool, (err, res) => {
      if (err) return console.log(err);
      return reply(res.rows);
    });
  }
};
