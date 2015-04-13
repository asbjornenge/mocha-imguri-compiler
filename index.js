var fs   = require('fs')
var esc  = require('js-string-escape')
var exts = ['.png','.gif','.jpg','.jpeg','.svg']
var orig = require.extensions['.js']

var loader = function(ext, module, filename) {
    if (filename.indexOf('node_modules') >= 0) return orig(module, filename)
    if (ext == '.svg') handleSvg(ext, module, filename)
    else handleRaster(ext, module, filename)
}

function handleSvg(ext, module, filename) {
    var svg = fs.readFileSync(filename, 'utf-8')
    return module._compile("module.exports = 'data:image/svg+xml;utf8,"+esc(svg)+"'", filename)
}

function handleRaster(ext, module, filename) {
    var _base64 = fs.readFileSync(filename, 'base64')
    return module._compile('module.exports = "data:image/'+ext.slice(1)+';base64,'+_base64+'"', filename)
}

exts.forEach(function(ext) {
    require.extensions[ext] = loader.bind(undefined, ext) 
})
