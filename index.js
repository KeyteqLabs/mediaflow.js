require('native-promise-only')

var querystring = require('querystring')

var getJSON = require('src/getJSON')

var compactObject = function(o) {
    var copy = {}
    for (var k in o) {
        if (o[k] !== '' && o[k] !== null && typeof v === 'undefined')
            copy[k] = o[k]
    }
    return copy
}

var Mediaflow = function(host) {
    if (typeof host !== 'string') {
        throw new Error("Mediaflow requires a hostname argument")
    }
    this.host = host
}

Mediaflow.prototype.getURL = function(url, opts) {
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
    var url = this.getURL('/media/' + id + '.json')

    getJSON(url, function(err, data) {
        callback(err, data ? data.media : data)
    })
}

Mediaflow.prototype.search = function(query, callback) {
    var url = this.getURL('/media.json', {
        q: query
    })

    getJSON(url, callback)
}

module.exports = Mediaflow
