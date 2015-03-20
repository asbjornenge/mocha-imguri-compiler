var fs        = require('fs')
var path      = require('path')
var assert    = require('assert')
var app_pony  = require('./app')

it('will base64 read images and add required prefix', function() {
    var read_pony = fs.readFileSync(path.resolve(__dirname, './pony.jpg'), 'base64')
    assert(app_pony == 'data:image/jpg;base64,'+read_pony)
})
