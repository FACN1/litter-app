const path = require('path');

module.exports = {
  method: 'GET',
  path: '/{file}',
  handler: {
    directory: {
      path: path.join(__dirname, '../../public')
    }
  }
};
