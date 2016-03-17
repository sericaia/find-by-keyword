# find-by-keyword

#### Having a store of keywords, returns the probability of certain element be found based on it's keywords

```js
var assert = require('assert');
var findByKeyword = require('./');

var store = [
  {title: 'sissi', keywords: ['cat', 'animal']},
  {title: 'nica', keywords: ['dog', 'animal']},
  {title: 'pantufa', keywords: ['dog', 'animal']},
  {title: 'dogs', keywords: ['animals']}
];

assert.deepEqual(findByKeyword(store, 'dog'),
  [[{nica: '0.50'}, {pantufa: '0.50'}]);

assert.deepEqual(findByKeyword(store, 'animal'),
  [{sissi: '0.26'}, {nica: '0.26'}, {pantufa: '0.26'}, {dogs: '0.22'}]);

assert.deepEqual(findByKeyword(store, 'animals'),
  [{sissi: '0.24'}, {nica: '0.24'}, {pantufa: '0.24'}, {dogs: '0.28'}]);

```

## install

```bash
npm install [--save/--save-dev] find-by-keyword
```

## license

MIT
