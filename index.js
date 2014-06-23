require('native-promise-only')

var querystring = require('querystring')

var getJSON = require('src/getJSON')
var compactObject = require('src/compactObject')

var crypto = require('crypto')

var sign = function(args, apiKey)  {
    message = Object.keys(args)
        .filter(function(key) {
            return args[key] !== '@' && typeof args[key] !== 'object'
        })
        .map(function(key) { return key + args[key] })
        .join('')

    var hmac = crypto.createHmac('sha1', apiKey)
    hmac.setEncoding('hex')
    hmac.write(message)
    hmac.end()
    return hmac.read()
}

var Mediaflow = function(host) {
    if (typeof host !== 'string') {
        throw new Error("Mediaflow requires a hostname argument")
    }
    this.host = host
    this.username = null
    this.key = null
}

Mediaflow.prototype.url = function(url, opts) {
    var options = {
        host: this.host,
        port: 80,
        path: url,
        headers: {}
    }
    var query = querystring.stringify(compactObject(opts))
    if (query) options.path += '?' + query

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
    getJSON(this.url('/media/' + id + '.json'), function(err, data) {
        callback(err, data ? data.media : err)
    })
}

Mediaflow.prototype.search = function(query, callback) {
    var args = {q: query}
    getJSON(this.url('/media.json', args), callback)
}

module.exports = Mediaflow
