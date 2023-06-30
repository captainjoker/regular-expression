const path = require('path');

module.exports = {
  entry : {
    match : {
      import : './src/index.js',
      library : {
        name : 'RegularExpression',
        type : 'umd',
        umdNamedDefine : true,
      },
    },
    generateNode : {
      import : './src/generateNode/index.js',
      library : {
        name : 'RegExpGenerateNode',
        type : 'umd',
        umdNamedDefine : true,
      },
    },
    // match : './src/index.js',
    // generateNode : './src/generateNode/index.js',
  },
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'regular-expression.[name].js',
    /* library : {
      name : [ 'RegularExpression', '[name]' ],
      type : 'umd',
    }, */
    clean : true,
  },
  mode : 'production'
};