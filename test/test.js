'use strict';

var lab = require('lab').script();
var assert = require('assert');
var findByKeyword = require('../');


lab.suite('find-by-keyword', function() {
  lab.test('empty', function(done) {
    assert.deepEqual(findByKeyword(1), 1);
    done();
  });
});

exports.lab = lab;
