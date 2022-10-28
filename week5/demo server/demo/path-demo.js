const path = require('path');

let filePath = path.join(__dirname, 'path-demo.js');

let fileExt = path.extname(filePath);

let basename = path.basename(filePath);
console.log(basename)