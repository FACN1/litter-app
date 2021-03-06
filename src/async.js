const waterfall = (input, tasks, callback) => {
  if (tasks.length === 0) {
    return callback(null, input);
  }
  return tasks[0](input, (err, result) => {
    if (err) {
      return callback(err);
    }
    return waterfall(result, tasks.slice(1), callback);
  });
};

module.exports = {
  waterfall
};
