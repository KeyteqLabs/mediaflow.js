var expect = require('chai').expect
var Mediaflow = require('index')

describe('auth', function() {
    var host = 'foo.mediaflowapp.com'
    var username = 'foo'
    var key = 'bar'
    it('should respond to auth', function() {
        var mf = new Mediaflow(host)
        expect(mf).to.respondTo('auth')
        mf.auth('foo', 'bar')
        expect(mf.username).to.equal(username)
        expect(mf.key).to.equal(key)
    })
})
