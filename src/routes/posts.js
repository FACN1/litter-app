module.exports = {
  method: 'GET',
  path: '/posts',
  handler: (request, reply) => {
    const context = {
      title: 'Posts Page'
    };

    return reply.view('posts', context);
  }
};
