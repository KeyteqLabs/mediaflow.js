require('native-promise-only')

var querystring = require('querystring')

var getJSON = require('src/getJSON')
var compactObject = require('src/compactObject')

var Mediaflow = function(host) {
    if (typeof host !== 'string') {
        throw new Error("Mediaflow requires a hostname argument")
    }
    this.host = host
}

Mediaflow.prototype.url = function(url, opts) {
    var url = 'http://' + this.host + url
    var query = querystring.stringify(compactObject(opts))
    if (query) url += '?' + query
    return url
}

Mediaflow.prototype.auth = function(username, key) {
    this.username = username
    this.key = key
    return this
}

Mediaflow.prototype.media = function(id, callback) {
    // Fetch media
    getJSON(this.url('/media/' + id + '.json'), function(err, data) {
        callback(err, data ? data.media : err)
    })
}

Mediaflow.prototype.search = function(query, callback) {
    var args = {q: query}
    getJSON(this.url('/media.json', args), callback)
}

module.exports = Mediaflow
