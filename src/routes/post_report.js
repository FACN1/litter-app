const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');
const async = require('../async.js');

module.exports = {
  method: 'POST',
  path: '/post-report',
  handler: (request, reply) => {
    const formData = JSON.parse(request.payload);

    // insert report details
    const insertDetails = (postData) => {
      const insertData = postData;
      dbQueries.postReportDetails(connPool, insertData, (postReportDetailsError, result) => {
        if (postReportDetailsError) return console.log(postReportDetailsError);

        const postId = result.rows[0].post_id;
        insertData.post_id = postId;
        return insertData;
      });
    };

    // insert posts tags
    const insertPostsTags = (insertData) => {
      if (insertData.type_tags.length > 0) {
        return dbQueries.postReportTags(connPool, insertData, (postErr) => {
          if (postErr) return console.log(postErr);
          return insertData;
        });
      }
      return insertData;
    };
    async.waterfall(
      formData,
      [insertDetails, insertPostsTags],
      (error, insertData) => {
        if (error) return console.log(error);
        return reply.redirect('posts', insertData.post_id);
      });
    // return reply.redirect(`/posts?id=${postId}`);
  }
};
