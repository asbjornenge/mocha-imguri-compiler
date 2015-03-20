var fs        = require('fs')
var assert    = require('assert')
var app_pony  = require('./app')

it('will base64 read images and add required prefix', function() {
    var read_pony = fs.readFileSync('./pony', 'base64')
    console.log(read_pony)
    assert(false)
})
