var expect = require('chai').expect
var nock = require('nock');
var Mediaflow = require('index')

var mediaDefinition = require('mocks/media')

var host = 'foo.mediaflowapp.com'

var media = mediaDefinition(host)

var api = nock('http://' + host)
    .get('/media/fakeid.json').reply(200, { media: media })
    .get('/media/nonexistant.json').reply(404)

describe('media', function() {
    var username = 'foo'
    var key = 'bar'
    it('fetch media calls callback', function(done) {
        var requireKeys = ['_id', 'tags', 'file', 'created', 'modified', 'name']
        var mf = new Mediaflow(host)
        mf.media('fakeid', function(err, result) {
            expect(err).to.be.null
            expect(result)
                .to.be.an('object')
                .and.to.have.keys(Object.keys(media))
            done()
        })
    })

    it('gives proper error for 404', function(done) {
        var mf = new Mediaflow(host)
        mf.media('nonexistant', function(err, result) {
            expect(err)
                .to.not.be.null
                .and.to.be.instanceof(Error)
                .and.to.match(/Not found/)
            done()
        })
    })
})
