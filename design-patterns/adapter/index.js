// 案例 1
// 目标 ( Target )：大陆的电器插头
// 被适配者 ( Adaptee )：港式的电器插头
// 适配器 ( Adapter )：类比为转换器

class Target {
  small() {
    console.log('this is small')
  }
}

class Adaptee {
  big() {
    console.log('this is big')
  }
}

// 如何能让港式插头也可以使用呢(big函数)

class Adapter {
  constructor(adaptee) {
    this.adaptee = adaptee
  }

  small() {
    console.log('hi,this is adapter, and this is small Function，but actually you are using big function')
    this.adaptee.big()
  }
}

let adaptee = new Adaptee()
let adapter = new Adapter(adaptee)
adapter.small()


// 案例 2
// 假设我们使用 高德地图和谷歌地图展现地图
{
  let googleMap = {
    showMap() {
      console.log('开始渲染谷歌地图')
    }
  }
  let GDMap = {
    showMap() {
      console.log('开始渲染高德地图')
    }
  }
  let renderMap = (map) => {
    if (map.showMap instanceof Function) {
      map.showMap()
    }
  }
  renderMap(googleMap)
  renderMap(GDMap)
}
// 假设高德地图和谷歌地图提供了一致的 showMap api，这个程序是没有问题的
// 如果 高德地图提供的方法为 displayMap，就需要做适配了
{
  let googleMap = {
    showMap() {
      console.log('开始渲染谷歌地图')
    }
  }
  let GDMap = {
    displayMap() {
      console.log('开始渲染高德地图')
    }
  }
  let GDMapAdapter = {
    showMap() {
      return GDMap.displayMap()
    }
  }
  renderMap(googleMap)
  renderMap(GDMapAdapter)
}
