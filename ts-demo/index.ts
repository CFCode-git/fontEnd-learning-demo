// 泛型 类型的参数
function echo<T>(arg: T): T {
  return arg;
}

echo('hi');

function echo2<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

echo2([1, 3, 34, 6, 23]);

let echo3: { <T>(arg: Array<T>): Array<T> } = echo2;
echo3([1, 1, 1, 1, 1]);


// 泛型类
class Father<T> {
  child: T;
  age: number;
}

const father1 = new Father<String>();
father1.child = 'jack';
father1.age = 18;

// 泛型约束

interface echoLength {
  length: number;
}

function echo4<T extends echoLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

echo4([1, 11, 1, 1]);

// 类型守卫 -- 顶的 其实就是一个用来判断参数具体类型的函数 整这么高级的词干啥。。
interface Bird{
  fly();
  layEggs()
}
interface Fish{
  swim();
  layEggs()
}
// @ts-ignore
function getSmallPet():Fish|Bird{
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // ok
// @ts-ignore
pet.swim(); // error

function isFish(pet:Fish|Bird):pet is Fish{
  return (<Fish>pet).swim !== undefined
}

if(isFish(pet)){
  pet.swim()
}else{
  pet.fly()
}

function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
// typeof 可以直接被识别为类型保护，不需要写上面两个函数也行。

/*
* unknown any never number string boolean null undefined void
* */
