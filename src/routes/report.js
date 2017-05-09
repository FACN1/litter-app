module.exports = {
  method: 'GET',
  path: '/report',
  handler: (request, reply) => {
    const context = {
      title: 'Report Waste',
      token: process.env.MAPBOX_TOKEN,
      origin: 'report'
    };

    return reply.view('report', context);
  }
};
