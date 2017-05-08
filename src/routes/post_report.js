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
      console.log('. insertDetails successfull');
      return dbQueries.postReportDetails(connPool, insertData, (postReportDetailsError, result) => {
        if (postReportDetailsError) return console.log(postReportDetailsError);

        const postId = result.rows[0].post_id;
        insertData.post_id = postId;
        // console.log('insertData: ', insertData);
        return insertData;
      });
    };

    // insert posts tags
    const insertPostsTags = (insertData) => {
      if (insertData.type_tags.length > 0) {
        console.log('>> insertPostsTags succesfull');
        return dbQueries.postReportTags(connPool, insertData, (postErr) => {
          if (postErr) return console.log(postErr);
          return insertData;
        });
      }
      console.log('>> insertPostsTags succesfull');
      return insertData;
    };
    // asynchronously insert details and posts_tags
    // passing post ID to callback
    async.waterfall(
      formData, [insertDetails, insertPostsTags], (error, insertData) => {
        if (error) return console.log(error);
        console.log('callback reached');
        return reply.redirect(`/posts?id=${insertData.post_id}`);
      });
    // return reply.redirect(`/posts?id=${postId}`);
  }
};
