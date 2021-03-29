{
  const singleton = function (name) {
    this.name = name
    this.instance = null
  }

  singleton.prototype.getName = function () {
    console.log(this.name)
  }

  singleton.getInstance = function (name) {
    if (!this.instance) {
      this.instance = new singleton(name)
    }
    return this.instance
  }

  const a = singleton.getInstance('a')
  const b = singleton.getInstance('b')
  console.log(a === b)
}

{
  var CreateSingleton = (function () {
    let instance
    return function (Singleton, name) {
      if (!instance) {
        return instance = new Singleton(name)
      }
      return instance
    }
  })()

  var Singleton = function (age) {
    this.age = age
  }

  let a = new CreateSingleton(Singleton, 18)
  let b = new CreateSingleton(Singleton, 19)
  console.log(a === b)
}
