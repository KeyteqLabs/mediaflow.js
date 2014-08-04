var http = require('http')
var compactObject = require('./compactObject')

var FD = require("form-data")
if (typeof FormData === 'undefined') {
    FormData = FD
}

var noop = function() {}

var handleResponse = function(res, cb) {
    if (res.statusCode !== 200) {
        return cb(http.STATUS_CODES[''+res.statusCode])
    }
    var body = ''
    res.on('data', function(chunk) { body += chunk.toString() })
    res.on('end', function() { cb(null, JSON.parse(body)) })
}

var defaultOptions = function(options) {
    if (typeof options.withCredentials === 'undefined')
        options.withCredentials = false
    return options
}

function getJSON(options, cb) {
    options = defaultOptions(options)
    return http.get(options, function(res) {
        handleResponse(res, cb)
    })
    .on('error', function(err) {
        cb(err)
        cb = noop
    })
}

function postJSON(url, data, cb) {
    if (typeof data !== 'object') {
        throw new Error("http.postJSON args must be of type 'object'")
    }

    if ('append' in data) {
        data.submit(url, function(err, res) {
            handleResponse(res, cb)
        })
    }
}

module.exports = {
    getJSON: getJSON,
    postJSON: postJSON
}
