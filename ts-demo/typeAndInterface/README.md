# interface VS type // 接口 VS 类型别名

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

