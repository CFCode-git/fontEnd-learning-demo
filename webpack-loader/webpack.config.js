const path = require('path')

module.exports = {
  mode:'development',
  entry:{
    main:'./src/index.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  resolveLoader:{
    modules:['node_modules','./loaders']
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'replaceLoaderAsync.js',
          },
          {
            loader:path.resolve(__dirname,'./loaders/replaceLoader.js'),
            options:{
              name:'echo hello'
            }
          }
        ]
      }
    ]
  }
}
