const connPool = require('../../database/db_connect.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'GET',
  path: '/posts',
  handler: (request, reply) => {
    // request post data from DB using the url query parameter
    dbQueries.getPostData(connPool, request.query.id, (err, res) => {
      if (err) return console.log(err);

      const postData = res.rows[0];
      console.log(postData);

      const context = {
        title: 'Posts Page',
        imgUrl: postData.image_url
      };

      return reply.view('posts', context);
    });
  }
};
