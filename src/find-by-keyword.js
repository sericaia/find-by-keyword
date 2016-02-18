var _ = require('lodash');

var findByKeyword = function(store, keyword) {

  var reducedStore = _.reduce(store, function(total, item) {
    if (_.includes(item.keywords, keyword)) {
      total.push(item.title);
    }
    return total;
  }, []);

  return _.reduce(reducedStore, function(total, item, index, array) {

    var obj = {};
    obj[ item ] = (1 / array.length).toFixed(2);

    total.push(obj);
    return total;
  }, []);
};

module.exports = findByKeyword;
