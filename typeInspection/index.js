let toString = Object.prototype.toString

function toType(obj) {
  if (typeof obj !== 'function' && typeof obj !== 'object') return typeof obj

  let instanceExp = /^\[object ([a-zA-Z]+)\]$/
  let value = instanceExp.exec(toString.call(obj))[1] || 'object'
  return value.toLowerCase()
}

const a = null,
  b = undefined,
  c = 1,
  d = '1',
  f = Symbol(),
  g = () => {},
  h = new Date(),
  i = new RegExp(),
  j = true,
  k = false,
  l = [1,2,3]

console.log(toType(a))
console.log(toType(b))
console.log(toType(c))
console.log(toType(d))
console.log(toType(f))
console.log(toType(g))
console.log(toType(h))
console.log(toType(i))
console.log(toType(j))
console.log(toType(k))
console.log(toType(l))
