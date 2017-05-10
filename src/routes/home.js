module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const context = {
      title: 'Tip Off'
    };

    return reply.view('home', context);
  }
};
