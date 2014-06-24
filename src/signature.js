var crypto = require('crypto')

module.exports = function(args, apiKey)  {
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
