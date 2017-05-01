module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {

    const context = {
      hello: 'Hello World'
    };
    
    return reply.view('index', context);
  }
};
