# 深拷贝

使用 cache 拷贝的对象做缓存, 用于处理环引用

对于基本类型直接返回 source

对于引用类型, 按照 Array Function RegExp Date 分别进行初始化

使用 for in 遍历对象, 使用 hasOwnProperty 跳过原型属性

JSON.stringify()

Lodash.cloneDeep()

# 浅拷贝: 

Object.assign({},obj)  

{...obj}