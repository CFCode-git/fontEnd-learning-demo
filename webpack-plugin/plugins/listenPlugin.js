// 监听资源变化插件
class listenPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap('fileChange', (watching) => {
      // console.log(watching)
      // console.log(watching.watchFileSystem)
      // console.log(watching.watchFileSystem.watcher)
      // console.log(watching.watchFileSystem.watcher.mtimes)
      const changeFiles = watching.watchFileSystem.watcher.mtimes
      for (let file in changeFiles) {
        console.log('===================================================')
        console.log('当前改动文件：' + file)
        console.log('===================================================')
      }
    })
  }
}
module.exports = listenPlugin
