const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Routes = require('./routes/router.js');
const Handlebars = require('handlebars');

const port = process.env.PORT || 3000;

const server = new Hapi.Server();

server.connection(
  {
    port
  }
);
server.register([Inert, Vision], (error) => {
  if (error) throw error;
})

server.views({
    engines: {
      hbs: Handlebars
    },
    relativeTo: __dirname,
    helpersPath: './views/helpers',
    path: './views',
    layout: 'layout',
    partialsPath: './views/partials',
    layoutPath: './views/layout'
  });

server.route(Routes);

server.start((error) => {
    if (error) throw error;

    console.log('Server running at:', server.info.uri);

  });
// });
