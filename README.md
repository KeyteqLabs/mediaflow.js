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

// Upload media in Node.js
// Requires `auth` to be called prior
mf.upload(fs.createReadStream(filepath), options, function(err, media) {
  err ? console.log('Err', err) : console.log('Media successfully uploaded', media)
})

// Load existing media
mf.media(mediaId, callback)
```

# Roadmap

* [x] Get single media
* [x] Search medias
* [x] Signed requests as well as anonymous
* [x] Upload support
* [x] Set up Travis-CI
* [ ] Set up tests to run in browser environments
* [ ] Promises based API
* [ ] Investigate providing as package for everything: npm + bower + amd + ES6
