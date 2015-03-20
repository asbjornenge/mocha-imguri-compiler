var fs   = require('fs')
var exts = ['.png','.gif','.jpg','.jpeg']
var orig = require.extensions['.js']

var loader = function(ext, module, filename) {
    if (filename.indexOf('node_modules') >= 0) return orig(module, filename)
    var _base64 = fs.readFileSync(filename, 'base64')
    return module._compile('module.exports = "data:image/'+ext+';base64,'+_base64+'"', filename)
}

exts.forEach(function(ext) {
    require.extensions[ext] = loader.bind(undefined, ext) 
})
