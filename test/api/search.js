var expect = require('chai').expect
var nock = require('nock');
var http = require('http');

var Mediaflow = require('../..')
var mediaDefinition = require('../../mocks/media')

var host = 'foo.mediaflowapp.com'

var media = mediaDefinition(host)
var api = nock('http://' + host)
    .get('/media.json').twice().reply(200, {
        total: 2,
        media: [media, media]
    })

var expectResult = function(result) {
    expect(result).to.be.an('object')
    expect(result.total).to.equal(2)
    expect(result.media)
        .to.be.an('array')
        .to.have.length(2)
    expect(result.media[0]).to.have.keys(Object.keys(media))
}

describe('search', function() {
    it('resolves promise', function() {
        var mf = new Mediaflow(host)
        mf.search('').then(expectResult)
    })

    it('calls callback with results', function(done) {
        var mf = new Mediaflow(host)
        mf.search('', function(err, result) {
            expectResult(result)
            done(err)
        });
    })
})
