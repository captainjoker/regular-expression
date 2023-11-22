const path = require('path');

module.exports = {
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'index.js',
    globalObject : 'this',
    library : {
      name : 'RegularExpressionMatch',
      type : 'umd',
    },
    clean : true,
  },
  mode : 'production'
};