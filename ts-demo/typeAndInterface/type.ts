/** type 类型别名
 *
 */

// type 类型别名 可以作用于 原始值 联合类型 元祖 以及其他需要手写的类型
// type 不会新建一个新的类型，相当于创建一个新的名字引用那个类型
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}

// 类型别名 + 泛型
type Container<T> = { value: T }

type Tree<T> = {
  value: T,
  left:Tree<T>,
  right:Tree<T>
}

