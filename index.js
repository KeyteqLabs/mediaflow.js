require('native-promise-only')

var querystring = require('querystring')
var nodeify = require('nodeify')

var http = require('./src/http')
var compactObject = require('./src/compactObject')
var sign = require('./src/signature')

var FD = require("form-data")
if (typeof FormData === 'undefined' && FD) {
    FormData = FD
}

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
    var url = this.url('GET', '/media/' + id + '.json')
    var p = new Promise(function(resolve,reject){
        http.getJSON(url, function(err, data) {
            return err ? reject(err) : resolve(data.media)
        })
    })
    return nodeify(p, callback)
}

Mediaflow.prototype.upload = function(file, options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = {}
    }
    var formData = new FormData()
    formData.append('file', file)
    for (var key in options) {
        if (Array.isArray(options[key])) {
            options[key].forEach(function(val) {
                formData.append(key + '[]', val)
            })
        }
        else {
            formData.append(key, options[key])
        }
    }
    var url = this.url('POST', '/media.json', options)
    var p = new Promise(function(resolve, reject) {
        http.postJSON(url, formData, function(err, data) {
            return err ? reject(err) : resolve(data.media)
        })
    })
    return nodeify(p, callback)
}

Mediaflow.prototype.search = function(query, callback) {
    var url = this.url('GET', '/media.json', {q: query})
    var p = new Promise(function(resolve, reject) {
        http.getJSON(url, function(err, data) {
            return err ? reject(err) : resolve(data)
        })
    })
    return nodeify(p, callback)
}

module.exports = Mediaflow
