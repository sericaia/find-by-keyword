'use strict';

var lab = require('lab').script();
var assert = require('assert');
var findByKeyword = require('../');


lab.suite('find-by-keyword simple store', function() {
  var store = [
    {title: 'sissi', keywords: ['cat']}
  ];

  lab.test('empty', function(done) {
    assert.deepEqual(findByKeyword([]), []);
    done();
  });

  lab.test('find a unique value', function(done) {
    assert.deepEqual(findByKeyword(store, 'cat'), [{sissi: '1.00'}]);
    done();
  });
});

lab.suite('find-by-keyword multiple value store', function() {
  var store = [
    {title: 'sissi', keywords: ['cat', 'animal']},
    {title: 'nica', keywords: ['dog', 'animal']},
    {title: 'pantufa', keywords: ['dog', 'animal']},
    {title: 'dogs', keywords: ['animals']}
  ];

  lab.test('find a value with multiple results', function(done) {
    assert.deepEqual(findByKeyword(store, 'dog'),
      [{nica: '0.50'}, {pantufa: '0.50'}]);
    done();
  });

  lab.test('find a value with multiple results (2)', function(done) {
    assert.deepEqual(findByKeyword(store, 'animal'),
      [{sissi: '0.26'}, {nica: '0.26'}, {pantufa: '0.26'}, {dogs: '0.22'}]);
    done();
  });

  lab.test('find a multiple value by similarity', function(done) {
    assert.deepEqual(findByKeyword(store, 'animals'),
      [{sissi: '0.24'}, {nica: '0.24'}, {pantufa: '0.24'}, {dogs: '0.28'}]);
    done();
  });

});

exports.lab = lab;
