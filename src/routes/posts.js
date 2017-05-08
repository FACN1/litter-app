const connPool = require('../../database/db_connect.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'GET',
  path: '/posts',
  handler: (request, reply) => {
    // request post data from DB using the url query parameter
    dbQueries.getPostData(connPool, request.query.id, (err, res) => {
      if (err) return console.log(err);

      const context = {
        title: 'Posts Page',
        post: res.rows[0]
      };

      // request the tags connected to this post
      return dbQueries.getTags(connPool, request.query.id, (tagsErr, tagsRes) => {
        if (tagsErr) return console.log(tagsErr);

        // if there are any tags, request their relative names from the DB
        if (tagsRes.rows.length > 0) {
          // reduce to array of tag ids
          const tagIds = tagsRes.rows.map(tag => tag.tag_id);

          // request tag names using tag ids
          return dbQueries.getTagNames(connPool, tagIds, (nameErr, nameRes) => {
            if (nameErr) return console.log(nameErr);

            // reduce to array of tag names and add to view context
            context.post.tags = nameRes.rows.map(name => name.description);
            return reply.view('posts', context);
          });
        }

        // return here if no tags
        return reply.view('posts', context);
      });
    });
  }
};
