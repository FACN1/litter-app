module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const context = {
      title: 'Landing Page'
    };

    return reply.view('home', context);
  }
};
