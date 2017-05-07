const dbQueries = {};

// retrieve map markers from DB
dbQueries.getMarkers = (connPool, callback) => {
  connPool.query(
    'SELECT * FROM markers',
    callback
  );
};

dbQueries.postReportDetails = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO posts (image_url, location, description, size) VALUES ($1, $2, $3, $4) RETURNING id AS post_id',
    [data.image, data.location, data.description, data.size],
    callback
  );
};

dbQueries.postReportTags = (connPool, data, callback) => {
  let queryString = 'INSERT INTO posts_tags (post_id, tag_id) VALUES ';
  const dataArray = [];

  data.type_tags.map((tag, index, array) => {
    queryString += `($${(index * 2) + 1}, $${(index * 2) + 2})`;
    if (index !== array.length - 1) queryString += ', ';
    return dataArray.push(data.post_id, data.type_tags[index]);
  });

  connPool.query(
    queryString,
    dataArray,
    callback
  );
};

module.exports = dbQueries;
