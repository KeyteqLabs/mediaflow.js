var expect = require('chai').expect;
var Mediaflow = require('index');

describe('Mediaflow', function() {
    describe('constructor', function() {
        it('should be a constructor', function() {
            expect(Mediaflow).to.be.a('function');
        });

        it('should throw exception without host', function() {
            var fn = function() { new Mediaflow(); }
            expect(fn).to.throw(Error);
        });

        it('should not throw, and set host, with host', function() {
            var host = 'foo.mediaflowapp.com';
            var fn = function() { return new Mediaflow(host); }
            expect(fn).to.not.throw(Error);
            expect(fn().host).to.equal(host);
        });
    });

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

    describe('media', function() {
        var host = 'foo.mediaflowapp.com'
        var username = 'foo'
        var key = 'bar'
        it('fetch media', function(done) {
            var mf = new Mediaflow(host)
            mf.auth('foo', 'bar')
            mf.media('fakeid', done)
        })
    })
})
