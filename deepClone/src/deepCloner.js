class DeepCloner {
  constructor() {
    this.cache = [];
  }

  clone(source) {
    if (source instanceof Object) {
      let cacheDist = this.findCache(source);
      if (cacheDist) {
        console.log("有缓存");
        return cacheDist;
      } else {
        console.log("没缓存");
        let dist;
        if (source instanceof Array) {
          dist = new Array();
        } else if (source instanceof Function) {
          dist = function () {
            return source.apply(this, arguments);
          };
        } else if (source instanceof RegExp) {
          dist = new RegExp(source.source, source.flags);
        } else if (source instanceof Date) {
          dist = new Date(source);
        } else {
          dist = new Object();
        }
        // 当 dist 创建成功了 马上放到 cache 里面 使得缓存生效
        // 因为下面要再次调用 deepClone 避免 dist 重复生成, 造成无限循环
        this.cache.push([source, dist]);
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key]);
          }
        }
        return dist;
      }
    }
    return source;
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1];
      }
    }
    return undefined;
  }
}

module.exports = DeepCloner;
