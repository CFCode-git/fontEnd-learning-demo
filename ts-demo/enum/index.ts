/** enum 枚举
 *
 */

// 常规使用 -- 数字枚举
enum Gender {
  male,
  female
}

console.log(Gender.male, Gender.female);

// 字符串枚举
enum Result {
  success = 'success',
  fail = 'fail'
}

console.log(Result.success, Result.fail);

// 反向映射
enum Enum {
  A
}

let a = Enum.A;
let nameOfA = Enum[a];
console.log(nameOfA);
