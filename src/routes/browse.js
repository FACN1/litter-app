require('env2')('config.env');

module.exports = {
  method: 'GET',
  path: '/browse',
  handler: (request, reply) => {
    if (!process.env.MAPBOX_TOKEN) {
      return new Error('You need a mapbox token');
    }

    const context = {
      title: 'Browse Map',
      token: process.env.MAPBOX_TOKEN
    };

    return reply.view('browse', context);
  }
};
