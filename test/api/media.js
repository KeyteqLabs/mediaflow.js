var expect = require('chai').expect
var nock = require('nock');
var Mediaflow = require('index')

var host = 'foo.mediaflowapp.com'
var mediaDefinition = { 
    _id: "4f06d86d5f513e6a14000000",
    attributes: {
        "4e201a505f513e2707000007":"Hola, como estas?"
    },
    created: 1325848685,
    modified: 1348560584,
    shared: 1340778028,
    externalId: 123,
    file: {
        uploaded:true,
        size:67081,
        type:"image/jpeg"
    },
    host: host,
    name: "My photo.jpg",
    references: [],
    tags: ["foo"]
}

var api = nock('http://' + host)
    .get('/media/nonexistant.json')
    .reply(404)

var api = nock('http://' + host)
    .get('/media/fakeid.json')
    .reply(200, { media: mediaDefinition })

describe('media', function() {
    var username = 'foo'
    var key = 'bar'
    it('fetch media calls callback', function(done) {
        var mf = new Mediaflow(host)
        mf.auth('foo', 'bar')
        mf.media('fakeid', function(err, media) {
            expect(err).to.be.null
            console.log(media);
            expect(media).to.be.an('object')
            done()
        });
    })
})
