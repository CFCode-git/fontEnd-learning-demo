const path = require('path')
const listenPlugin = require('./plugins/listenPlugin')


module.exports = {
  mode:'development',
  entry:{
    main:'./src/index.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },
  plugins:[
    new listenPlugin()
  ]
}

