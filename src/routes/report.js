module.exports = {
  method: 'GET',
  path: '/report',
  handler: (request, reply) => {
    const context = {
      hello: 'Hello World'
    };

    return reply.view('report', context);
  }
};
