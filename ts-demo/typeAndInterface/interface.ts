/** interface 接口
 *
 */

interface Teacher {
  readonly name: String // 只读
  age: Number,
  Subject: String,
  gender?: Gender
}

// 枚举
enum Gender {
  male = 'male',
  female = 'female'
}

const teacher: Teacher = {age: 22, name: 'Tom', Subject: 'Chinese', gender: Gender.male};
console.log(teacher.gender);

// 联合类型
interface Style {
  padding: string | number
}

// 类类型 在interface中描述一个方法，在类里面实现它 (描述了类的公共部分，在其他类中也可以使用)
interface ClockInterface {
  currentTime: Date;

  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date;

  setTime(d: Date) {
    this.currentTime = d;
  }

  constructor(h: number, m: number) {}
}

// 继承接口, 合成接口
interface Shape {
  color: string
}

interface penStroke {
  penWidth: number
}

interface Square extends Shape, penStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.penWidth = 5.0;
square.sideLength = 10;

//  混合接口
interface Counter {
  (start: number): string

  interval: number

  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {console.log(start);};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类 -- 会继承类的成员，不继承实现。 下面例子中，只有 Control 的子类 才能实现 SelectableControl 接口
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }

