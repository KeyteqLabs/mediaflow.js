var expect = require('chai').expect
var nock = require('nock');

var Mediaflow = require('../..')
var mediaDefinition = require('../../mocks/media')

var host = 'foo.mediaflowapp.com'

var media = mediaDefinition(host)

var api = nock('http://' + host)
    .get('/media/fakeid.json').twice().reply(200, { media: media })
    .get('/media/nonexistant.json').twice().reply(404)

describe('media', function() {
    var username = 'foo'
    var key = 'bar'
    var expectMedia = function(result) {
        expect(result)
            .to.be.an('object')
            .and.to.have.keys(Object.keys(media))
    }
    it('fetch resolves promise', function() {
        var mf = new Mediaflow(host)
        return mf.media('fakeid').then(expectMedia)
    })

    it('fetch media calls callback', function(done) {
        var mf = new Mediaflow(host)
        mf.media('fakeid', function(err, result) {
            expect(err).to.be.null
            expectMedia(result)
            done()
        })
    })

    var expectErr = function(err) {
        expect(err)
            .to.not.be.null
            .and.to.be.instanceof(Error)
        .and.to.match(/Not found/)
    }
    it('rejects promise on 404', function() {
        var mf = new Mediaflow(host)
        return mf.media('nonexistant').catch(expectErr)
    })

    it('gives proper error for 404 nodeify', function(done) {
        var mf = new Mediaflow(host)
        mf.media('nonexistant', function(err, result) {
            expectErr(err)
            done()
        })
    })
})
