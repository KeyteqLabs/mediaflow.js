var Mediaflow = require('index')
var argv = require('minimist')(process.argv.slice(2))
var prettyjson = require('prettyjson')

var args = argv._
var host = args.shift()
var cmd = args.shift()

var mf = new Mediaflow(host)

if (argv.username && argv.key) {
    mf.auth(argv.username, argv.key)
}

var output = function(data) {
    console.log(prettyjson.render(data));
}

var outputCb = function(err, media) { output(err || media) }

switch (cmd) {
case 'search':
    return mf.search(args[0], outputCb)
case 'media':
default:
    return mf.media(args[0], outputCb)
}
