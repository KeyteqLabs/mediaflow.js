require('native-promise-only')

var querystring = require('querystring')

var http = require('./src/http')
var compactObject = require('./src/compactObject')
var sign = require('./src/signature')

var Mediaflow = function(host) {
    if (typeof host !== 'string') {
        throw new Error("Mediaflow requires a hostname argument")
    }
    this.host = host
    this.username = null
    this.key = null
}

Mediaflow.prototype.url = function(method, url, opts) {
    var options = {
        host: this.host,
        port: 80,
        path: url,
        headers: {}
    }
    if (method === 'GET') {
        var query = querystring.stringify(compactObject(opts))
        if (query) options.path += '?' + query
    }

    if (this.username) {
        var signature = sign(opts, this.key)
        options.headers['X-Keymedia-Username'] = this.username
        options.headers['X-Keymedia-Signature'] = signature
    }
    return options
}

Mediaflow.prototype.auth = function(username, key) {
    this.username = username
    this.key = key
    return this
}

Mediaflow.prototype.media = function(id, callback) {
    // Fetch media
    http.getJSON(this.url('GET', '/media/' + id + '.json'), function(err, data) {
        callback(err, data ? data.media : err)
    })
}

Mediaflow.prototype.upload = function(file, options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = {}
    }
    var formData = new FormData()
    formData.append('file', file)
    for (var key in options) {
        formData.append(key, options[key])
    }
    var url = this.url('POST', '/media.json', options)
    http.postJSON(url, formData, function(err, data) {
        callback(err, data ? data.media : err)
    })
}

Mediaflow.prototype.search = function(query, callback) {
    var args = {q: query}
    http.getJSON(this.url('GET', '/media.json', args), callback)
}

module.exports = Mediaflow
