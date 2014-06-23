var expect = require('chai').expect
var nock = require('nock');
var http = require('http');
var Mediaflow = require('index')

var mediaDefinition = require('mocks/media')

var host = 'foo.mediaflowapp.com'

var media = mediaDefinition(host)
var api = nock('http://' + host, {
        reqheaders: {
            'x-keymedia-username': 'test',
            'x-keymedia-signature': '85384b169596f11d240105f9f8f028f42ab0ca9e'
        }
    })
    .get('/media.json?q=a').reply(200, {
        total: 2,
        media: [media, media]
    })

describe('media', function() {
    it('valid signature is used', function(done) {
        var mf = new Mediaflow(host)
        mf.auth('test', 'test')
        mf.search('a', function(err, result) {
            expect(result).to.be.an('object')
            expect(result.total).to.equal(2)
            expect(result.media)
                .to.be.an('array')
                .to.have.length(2)
            expect(result.media[0]).to.have.keys(Object.keys(media))

            done(err)
        });
    })
})
