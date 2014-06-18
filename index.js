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

Mediaflow.prototype.media = function(id) {
}

module.exports = Mediaflow
