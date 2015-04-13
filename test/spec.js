var fs        = require('fs')
var path      = require('path')
var assert    = require('assert')
var pony      = require('./pony.jpg')
var thumb     = require('./thumb.svg')

it('will base64 read images and add required prefix', function() {
    var read_pony = fs.readFileSync(path.resolve(__dirname, './pony.jpg'), 'base64')
    assert(pony == 'data:image/jpg;base64,'+read_pony)
})

it('supports svg and will inline directly (no base64) + optimize', function() {
    var read_thumb = fs.readFileSync(path.resolve(__dirname, './thumb.svg'), 'utf-8')
    assert(thumb == 'data:image/svg+xml;utf8,'+read_thumb)
})
