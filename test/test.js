'use strict';

var lab = require('lab').script();
var assert = require('assert');
var findByKeyword = require('../');


lab.suite('find-by-keyword', function() {
  var store = [
    {title: 'sissi', keywords: ['cat', 'animal']},
    {title: 'nica', keywords: ['dog', 'animal']},
    {title: 'pantufa', keywords: ['dog', 'animal']}
  ];


  lab.test('empty', function(done) {
    assert.deepEqual(findByKeyword([]), []);
    done();
  });

  lab.test('find a unique value', function(done) {
    assert.deepEqual(findByKeyword(store, 'cat'), [{sissi: '1.00'}]);
    done();
  });

  lab.test('find a multiple value', function(done) {
    assert.deepEqual(findByKeyword(store, 'animal'),
      [{sissi: '0.33'}, {nica: '0.33'}, {pantufa: '0.33'}]);
    done();
  });

  // future test
  // lab.test('find a multiple value by similarity', function(done) {
  //   assert.deepEqual(findByKeyword(store, 'animals'),
  //     [{sissi: '0.33'}, {nica: '0.33'}, {pantufa: '0.33'}]);
  //   done();
  // });

});

exports.lab = lab;
