const path = require('path');

module.exports = {
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'regular-expression.js',
    library : {
      name : 'RegularExpression',
      type : 'umd',
    },
  },
  mode : 'production'
};