var fs   = require('fs')
var SVGO = require('svgo')
var wait = require('wait.for')
var svgo = new SVGO({})
var exts = ['.png','.gif','.jpg','.jpeg','.svg']
var orig = require.extensions['.js']

var loader = function(ext, module, filename) {
    if (filename.indexOf('node_modules') >= 0) return orig(module, filename)
    if (ext == '.svg') wait.launchFiber(handleSvg, ext, module, filename)
    else handleRaster(ext, module, filename)
}

function handleSvg(ext, module, filename) {
    var _svg = fs.readFileSync(filename, 'utf-8')
    var __svg;
    try {
        wait.for(svgo.optimize.bind(svgo), _svg)
    } catch(result) {
        __svg = result.data
    }
    if (!__svg) throw new Error('Unable to parse svg')
    return module._compile("module.exports = 'data:image/svg+xml;utf8,"+__svg+"'", filename)
}

function handleRaster(ext, module, filename) {
    var _base64 = fs.readFileSync(filename, 'base64')
    return module._compile('module.exports = "data:image/'+ext.slice(1)+';base64,'+_base64+'"', filename)
}

exts.forEach(function(ext) {
    require.extensions[ext] = loader.bind(undefined, ext) 
})
