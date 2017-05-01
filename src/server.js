const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Routes = require('./routes/router.js');
const Handlebars = require('handlebars');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});

server.register([Inert, Vision], (error) => {
  if (error) throw error;

  server.views({
    engines: {
      hbs: Handlebars
    },
    relativeTo: Path.join(__dirname, 'handlebars'),
    helpersPath: './helpers',
    path: './views',
    layout: 'layout',
    partialsPath: './partials',
    layoutPath: './layout'
  });

  server.route(Routes);
});

module.exports = server;
