const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');

module.exports = {
  method: 'POST',
  path: '/post-report',
  handler: (request, reply) => {
    dbQueries.getMarkers(connPool, (err) => {
      if (err) return console.log(err);
      // redirect user to new post view
      return reply();
    });
  }
};
