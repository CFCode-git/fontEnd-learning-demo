# interface VS type // 接口 VS 类型别名

https://www.tslang.cn/docs/handbook/advanced-types.html

* interface 创建了一个新的名字，可以在其他任意地方使用。 type 并不会创建新的名字，报错信息不会显示别名。

鼠标悬停于 Alias 与 Interface 中，前者返回的是字面量，后者返回的是 Interface
```typescript
type Alias = { num: number }
interface Interface { num: number; }
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

* type 类型别名不能被 extends 和 implements

* 如果无法通过接口描述一个类型并且需要使用联合类型和元祖类型，通常就会使用类型别名。

类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

interface 和 type 很像，很多场景，两者都能使用。但也有细微的差别：

* 类型：对象、函数两者都适用，但是 type 可以用于基础类型、联合类型、元祖。

* 同名合并：interface 支持，type 不支持。

* 计算属性：type 支持, interface 不支持。总的来说，公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟。
