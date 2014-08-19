# Mediaflow.js
[![NPM](https://nodei.co/npm/mediaflow.png?mini=true)](https://www.npmjs.org/package/mediaflow)

[![Build Status](https://travis-ci.org/KeyteqLabs/mediaflow.js.svg?branch=master)](https://travis-ci.org/KeyteqLabs/mediaflow.js)

Mediaflow Node + Browser JavaScript implementation

# Usage

```javascript
var Mediaflow = require('mediaflow')
var mf = new Mediaflow('my.mediaflow.host.com')
mf.auth(username, apiKey) // Optional

mf.search('foobar').then(function(data) {
    console.log('Got', data.total, 'search results', data.media)
})

// Upload media in Node.js
// Requires `auth` to be called prior
// When passing a readstream you also need to specify
// a name of your file!
var options = {
    name: 'image.jpg',
    tags: ['foo', 'bar']
}
mf.upload(fs.createReadStream(filepath), options)
.then(function(media) {
  console.log('Media successfully uploaded', media)
})
.catch(function(err) {
  console.log('Got err', err)
})

// Load existing media
mf.media(mediaId).then(function(media) {
  console.log('Media details', media)
})
```

Node style callbacks are also supported.

# Roadmap

* [x] Get single media
* [x] Search medias
* [x] Signed requests as well as anonymous
* [x] Upload support
* [x] Set up Travis-CI
* [x] Promises based API
* [ ] Set up tests to run in browser environments
* [ ] Investigate providing as package for everything: npm + bower + amd + ES6
