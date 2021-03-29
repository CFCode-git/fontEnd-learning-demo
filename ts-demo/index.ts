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

// 类型守卫


/*
* unknown any never number string boolean null undefined void
* */
