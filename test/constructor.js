var expect = require('chai').expect
var Mediaflow = require('index')

describe('constructor', function() {
    var fn = function(host) { return new Mediaflow(host) }
    it('should be a constructor', function() {
        expect(Mediaflow).to.be.a('function')
    })

    it('should throw exception without host', function() {
        expect(fn).to.throw(Error)
    })

    it('should not throw, and set host, with host', function() {
        var host = 'foo.mediaflowapp.com'
        expect(fn.bind(fn, host)).to.not.throw(Error)
        expect(fn.call(fn, host).host).to.equal(host)
    })
})
