const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');

module.exports = {
  method: 'POST',
  path: '/post-report',
  handler: (request, reply) => {
    const postData = JSON.parse(request.payload);

    dbQueries.postReportDetails(connPool, postData, (err, result) => {
      if (err) return console.log(err);

      const postId = result.rows[0].post_id;

      postData.post_id = postId;

      return dbQueries.postReportTags(connPool, postData, (postErr) => {
        if (postErr) return console.log(postErr);
        // redirect user to new post view
        return reply.redirect(`/posts?id=${postId}`);
      });
    });
  }
};
