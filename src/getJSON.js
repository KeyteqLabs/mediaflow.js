var http = require('http')

var noop = function() {}

module.exports = function getJSON(options, cb) {
    if (typeof options.withCredentials === 'undefined')
        options.withCredentials = false
    return http.get(options, function(res) {
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
