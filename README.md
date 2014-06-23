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
