const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');
const async = require('../async.js');

module.exports = {
  method: 'POST',
  path: '/post-report',
  handler: (request, reply) => {
    const formData = JSON.parse(request.payload);

    // insert report details
    const insertDetails = (postData, callback) => {
      const insertData = postData;
      return dbQueries.postReportDetails(connPool, insertData, (postReportDetailsError, result) => {
        if (postReportDetailsError) return console.log(postReportDetailsError);

        const postId = result.rows[0].post_id;
        insertData.post_id = postId;
        return callback(null, insertData);
      });
    };

    // insert posts tags
    const insertPostsTags = (insertData, callback) => {
      if (insertData.type_tags.length > 0) {
        return dbQueries.postReportTags(connPool, insertData, (postErr) => {
          if (postErr) return console.log(postErr);
          return callback(null, insertData);
        });
      }
      return callback(null, insertData);
    };
    // asynchronously insert details and posts_tags
    // passing post ID to callback
    async.waterfall(
      formData, [insertDetails, insertPostsTags], (error, insertData) => {
        if (error) return console.log(error);

        // return post ID to scripts/report.js
        return reply(insertData.post_id);
      });
  }
};
