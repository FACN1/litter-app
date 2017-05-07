const dbQueries = {};

// retrieve map markers from DB
dbQueries.getMarkers = (connPool, callback) => {
  connPool.query(
    'SELECT * FROM markers',
    callback
  );
};

// get post data from DB
dbQueries.getPostData = (connPool, id, callback) => {
  connPool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id],
    callback
  );
};

module.exports = dbQueries;
