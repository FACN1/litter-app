module.exports = {
  method: 'GET',
  path: '/report',
  handler: (request, reply) => {
    const context = {
      title: 'Report'
    };

    return reply.view('report', context);
  }
};
