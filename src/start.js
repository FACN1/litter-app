const Server = require('./server.js');

Server.start((error) => {
  if (error) throw error;
  console.log('Server running at:', Server.info.uri);
});
