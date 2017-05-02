module.exports = {
  method: 'GET',
  path: '/browse',
  handler: (request, reply) => {
    const context = {
      title: 'Browse Sites'
    };

    return reply.view('browse', context);
  }
};
