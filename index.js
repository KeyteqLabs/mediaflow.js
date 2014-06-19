require('native-promise-only')

var http = require('http')

var noop = function() {}

var getJSON = function(url, cb) {
    return http.get(url, function(res) {
        if (res.statusCode !== 200) {
            return cb(http.STATUS_CODES[''+res.statusCode])
        }
        var body = ''
        res.on('data', function(chunk) { body += chunk.toString() })
        res.on('end', function() { cb(null, JSON.parse(body)) })
    }).on('error', function(err) {
        cb(err)
        cb = noop
    })
}

var Mediaflow = function(host) {
    if (typeof host !== 'string') {
        throw new Error("Mediaflow requires a hostname argument")
    }
    this.host = host
}

Mediaflow.prototype.auth = function(username, key) {
    this.username = username
    this.key = key
    return this
}

Mediaflow.prototype.media = function(id, callback) {
    // Fetch media
    var url = 'http://' + this.host + '/media/' + id + '.json'

    getJSON(url, function(err, data) {
        callback(err, data ? data.media : data)
    })
}

Mediaflow.prototype.search = function(query, callback) {
    var url = 'http://' + this.host + '/media.json'
    if (query) url += '?q=' + query

    getJSON(url, callback)
}
module.exports = Mediaflow
