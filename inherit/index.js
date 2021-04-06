/** 原型链继承
 *  把父类生成的实例当成子类的原型
 *  缺点：
 *  引用类型的属性会被所有的实例共享。
 *  子类实例化后的原型对象是父类的实例，如果其中一个实例的引用类型属性被修改，会影响该子类生成的所有属性。
 */
{
  function Parent() {
    this.name = 'baba'
    this.son = [1, 2, 3]
  }

  Parent.prototype.getName = function () {
    return this.name
  }

  function Child() {
    this.friends = ['a', 'b', 'c']
    this.getFriends = function () {
      return this.friends
    }
  }

  Child.prototype = new Parent()

  let child1 = new Child()
  let child2 = new Child()
  child1.son.push('hi')
  console.log(child1)
  console.log(child2)
  console.log(1, child1.son)
  console.log(2, child2.son)
  console.log('========================================')
}


/** 构造函数继承 （经典继承）
 *  避免了引用类型的属性被子类的所有实例共享
 *  实现父类的属性和方法的继承
 *  实例化后父类的属性会添加到实例的属性身上
 *  修改属性也不会影响其他属性
 *  缺点：
 *  无法继承父类的原型上的方法和属性
 */
{
  function Parent() {
    this.name = 'baba'
    this.son = [1, 2, 3]
  }

  Parent.prototype.getName = function () {
    return this.name
  }

  function Child(){
    Parent.call(this)
    this.type = 'Child'
  }

  let child = new Child()
  console.log(child)
  // console.log(child.getName()) // 报错
  console.log('========================================')
}


/** 组合继承（原型链+构造函数）
 *  结合原型链继承和构造函数继承的优点
 *  解决了无法继承父类原型的属性和方法 以及 共用原型导致的修改属性方法影响到其他属性的问题
 *  缺点：
 *  Parent 被构造了两次，有多余的性能开销，实例和原型上有重复的属性
 */
{

  function Parent() {
    this.name = 'baba'
    this.son = [1, 2, 3]
  }

  Parent.prototype.getName = function () {
    return this.name
  }

  function Child(){
    Parent.call(this)
    this.type = 'Child'
  }

  Child.prototype = new Parent()

  let child1 = new Child()
  let child2 = new Child()
  child1.son.push('hi')
  child1.name = 'child'
  console.log(child1, child2)
  console.log(child1.son, child2.son)
  console.log(child1.getName())
  console.log(child2.getName())
  console.log('========================================')
}


/** 寄生式继承
 *  和原型链继承的缺点一样，其中一个实例修改了原型上的属性会影响其他的实例。
 */
{
  let parent = {
    name:'baba',
    son:[1,2,3],
    getName(){
      return this.name
    }
  }

  function clone(original){
    let clone = Object.create(original)
    clone.getFriends = function(){
      return this.friends
    }
    clone.friends = ['a','b','c']
    return clone
  }

  let person1 = clone(parent)
  let person2 = clone(parent)
  person1.friends.push('hihi')
  person1.son.push('sonson')
  console.log(person1, person2)
  console.log(person1.son, person2.son)
  console.log('========================================')
}


/** 原型式继承
 *  和原型链继承的缺点一样，其中一个实例修改了原型上的属性会影响其他的实例。
 */
{
  let parent = {
    name:'baba',
    son:[1,2,3],
    getName(){
      return this.name
    }
  }

  let person1 = Object.create(parent)
  person1.name = 'tom'
  person1.son.push('hihi')

  let person2 = Object.create(parent)
  person2.son.push('hellohello')

  console.log(person1, person2)
  console.log(person1.name,person1.getName())
  console.log(person2.name,person2.getName())
  console.log(person1.son,person2.son)
  console.log('========================================')
}


/** 寄生组合式继承 (best)
 *  在组合继承的基础上使用，Object.create 让子类继承父类的原型，属性和方法都得到了继承，并且只调用了一次父类的构造函数。
 */
{
  function clone(parent,child){
    // 这里使用 Object.create
    // 就能减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
  }

  function Parent(){
    this.name = 'baba'
    this.son = [1,2,3]
  }
  Parent.prototype.getName = function(){
    return this.name
  }
  function Child(){
    Parent.call(this)
    this.friends = ['a','b','c']
  }

  clone(Parent,Child)
  Child.prototype.getFriends = function(){
    return this.friends
  }

  let child1 = new Child()
  let child2 = new Child()
  child1.son.push(4)
  console.log(child1,child2)
  console.log(child1.son,child2.son)
  console.log('========================================')
}

{
  function Animal(color){
    this.color = color
  }
  Animal.prototype.move = function(){} // 动物可以动
  function Dog(color, name){
    // 或者 Animal.call(this, color)
    Animal.apply(this, arguments) /* 所谓的构造函数继承 */
    this.name = name
  }
  // 下面三行实现 Dog.prototype.__proto__ = Animal.prototype /* 所谓的原型链继承 */
  function temp(){}
  temp.prototye = Animal.prototype
  Dog.prototype = new temp()

  Dog.prototype.constuctor = Dog
  Dog.prototype.say = function(){ console.log('汪')}

  var dog = new Dog('黄色','阿黄')
}


{
  class Animal{
    constructor(color){
      this.color = color
    }
    move(){}
  }
  class Dog extends Animal{
    constructor(color, name){
      super(color)
      this.name = name
    }
    say(){}
  }
}
