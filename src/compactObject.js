var defaultTest = function(k, v) {
    return v !== '' && v !== null && typeof v !== 'undefined'
}
module.exports = function(o, test, copy) {
    copy = copy || {}
    test = test || defaultTest
    for (var k in o) {
        if (test(k, o[k])) copy[k] = o[k]
    }
    return copy
}
