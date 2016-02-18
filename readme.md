# find-by-keyword

### Having a store of keywords, returns the probability of certain element be found based on it's keywords

```js
var assert = require('assert');
var findByKeyword = require('./');

var store = [
  {title: 'sissi', keywords: ['cat', 'animal']},
  {title: 'nica', keywords: ['dog', 'animal']},
  {title: 'pantufa', keywords: ['dog', 'animal']}
];

assert.deepEqual(findByKeyword(store, 'cat'), [{sissi: '1.00'}]);
assert.deepEqual(findByKeyword(store, 'animal'),
  [{sissi: '0.33'}, {nica: '0.33'}, {pantufa: '0.33'}]);

//Future: Not implemented yet
assert.deepEqual(findByKeyword(store, 'animals'),
  [{sissi: '0.33'}, {nica: '0.33'}, {pantufa: '0.33'}]);

```

## install

```bash
npm install [--save/--save-dev] find-by-keyword
```

## license

MIT
