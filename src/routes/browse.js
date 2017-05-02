module.exports = {
  method: 'GET',
  path: '/browse',
  handler: (request, reply) => {
    const context = {
      title: 'Browse Map'
    };

    return reply.view('browse', context);
  }
};
