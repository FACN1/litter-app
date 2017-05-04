const dbQueries = {};

// retrieve map markers from DB
dbQueries.getMarkers = (connPool, callback) => {
  connPool.query(
    'SELECT * FROM markers',
    callback
  );
};

// dbQueries.postReport = (connPool, data, callback) => {
//   connPool.query(
//     ''
//   )
// }

module.exports = dbQueries;
