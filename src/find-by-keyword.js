'use strict';

var _ = require('lodash');
var levenshtein = require('fast-levenshtein');

var KEYWORD_TOTALLY_FOUND = 1;

/*
 * containsPartially uses levenshtein distance to understand the number of
 * words that are similar from one keyword to the other
 */
var containsPartially = function(storeKeyword, searchKeyword, callback) {
  levenshtein.getAsync(storeKeyword, searchKeyword, function (err, distance) {
    if (err) {
      throw new Error(err);
    }

    // returns the number of equal words
    var maxLength = Math.max(storeKeyword.length, searchKeyword.length);
    var percentage = ((maxLength - distance) / maxLength).toFixed(2);
    return callback(err, parseFloat(percentage));
  });
};

/*
 * getMaxReducedStore returns store for maximum percentage values for each
 * keyword (e.g {'sissi': 0.1}, {'sissi': 0.2} should pick {'sissi': 0.2})
 */
var getMaxReducedStore = function(store) {
  return store.reduce(function(total, item) {

    var foundItem = _.find(total, {title: item.title});
    if (!foundItem) {
      total.push(item);
    } else {
      // set max value found
      if (foundItem.percentage < item.percentage) {
        foundItem.percentage = item.percentage;
      }
    }
    return total;
  }, []);
};

/*
 * findByKeyword receives a store and finds a title which has that (or similar)
 * keyword
 */
var findByKeyword = function(store, keyword) {

  var reducedStore = _.reduce(store, function(total, item) {
    // has total word
    if (_.includes(item.keywords, keyword)) {
      total.push({title: item.title, percentage: KEYWORD_TOTALLY_FOUND});
    }
    else {
      // has the word partially
      item.keywords.forEach(function(storeKeyword) {
        containsPartially(storeKeyword, keyword, function(err, percentage) {
          if (percentage) {
            total.push({title: item.title, percentage: percentage});
            return;
          }
        });

      });
    }

    return total;
  }, []);

  var maxReducedStore = getMaxReducedStore(reducedStore);
  var percentageSum = _.sum(_.map(maxReducedStore, 'percentage'));

  return _.reduce(maxReducedStore, function(total, item) {

    var obj = {};
    obj[ item.title ] = (item.percentage / percentageSum).toFixed(2);

    total.push(obj);
    return total;
  }, []);
};

module.exports = findByKeyword;
