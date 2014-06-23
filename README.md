# Mediaflow.js

Mediaflow Node + Browser JavaScript implementation

# Usage

```javascript
var Mediaflow = require('mediaflow')
var mf = new Mediaflow('my.mediaflow.host.com')
mf.auth(username, apiKey) // Optional
mf.search('foobar', function(err, data) {
  console.loog('Got', data.total, 'search results', data.media)
})

// Load existing media
mf.media(mediaId, callback)
```

# Roadmap

* [x] Get single media
* [x] Search medias
* [x] Signed requests as well as anonymous
* [ ] Upload support
* [ ] Set up tests to run in browser environments
* [ ] Promises based API
* [ ] Set up Travis-CI
* [ ] Investigate providing as package for everything: npm + bower + amd + ES6
