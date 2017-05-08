(() => {
  function waterfall(input, tasks, callback) {
    console.log('tasks: ', tasks);
    if (tasks.length === 0) {
      return callback(null, input);
    }
    else {
      tasks[0](input, (err, input) => {
        console.log('tasks[0] called');
        if (err) {
          return callback(err);
        }
        return waterfall(input, tasks.slice(1), callback);
      });
    }
  }
  module.exports = {
    waterfall
  };
})();
