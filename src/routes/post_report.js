const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');

module.exports = {
  method: 'POST',
  path: '/post-report',
  handler: (request, reply) => {
    const postData = JSON.parse(request.payload);

    console.log(postData);


    dbQueries.postReportDetails(connPool, postData, (err, result) => {
      if (err) return console.log(err);

      const postId = result.rows[0].post_id;

      postData.post_id = postId;

      dbQueries.postReportTags(connPool, postData, (postErr, res) => {
        if (postErr) return console.log(postErr);
        return console.log(res);
      });

      // redirect user to new post view
      return reply(/*'/posts?post=',post_id*/);
    });
  }
};
