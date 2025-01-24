---
title: Javascript高级程序设计笔记
date: 2025-01-24 11:30:00
categories:
- [前端开发]
tags:
 - 前端知识
 - Javascript
---
# 第二章
## `<script>`元素
async： 可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。

defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。

## `<noscript>`元素
`<noscript>`元素可以包含任何出现在`<body>`中的元素，`<script>`除外。

下列两种情况下，浏览器将显示包含在`<noscript>`中的内容：

1. 浏览器不支持脚本。
2. 浏览器对脚本的支持被关闭。

任何一个条件被满足，包含在`<noscript>`中的内容就会被渲染，否则不会渲染`<noscript>`中的元素。

# 第三章
## var关键字
### var声明作用域
使用 var 操作符定义的变量会成为包含它的函数的局部变量（意思是在函数中使用var生命的变量，在函数退出时被销毁）。

**<font style="color:#E8323C;"> 在函数内定义变量时省略 var 操作符，可以创建一个全局变量。</font>**

### var声明提升
也就是把所有变量声明都拉到函数作用域的顶部。

## let关键字
let 声明的范围是块作用域， 而 var 声明的范围是函数作用域。

### 暂时性死区
let 声明的变量不会在作用域中被提升。 在 let 声明之前的执行瞬间被称为“暂时性死区”。

### 全局声明
与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声 明的变量则会）

## const关键字
const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改 const 声明的变量会导致运行时错误。

## 声明风格
### 不使用var
限制自己只使用 let 和 const 有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值。

### const优先，let次之
使用 const 声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。

## 数据类型
6种简单数据类型：Undefined，Null，Boolean，Number，String，Symbol

复杂数据类型：Object

Number()函数当传入的是对象时，调用valueOf()方法，如果转换结果是NaN，则调用toString()方法，再按照转换字符串的规则转换。

```javascript
Number([]) // 输出0，因为调用valueOf返回的不是原始值，调用toString返回的是空字符串
Number({}) // 输出NaN，因为没有valueOf和toString方法，报错Uncaught SyntaxError
```

# 第四章
## 原始值与引用
### 传递参数
这意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样。如果是原始值，那么就跟原始值变量的复制一样，如果是引用值，那么就跟引用值变量的复制一样。

### 确定类型
 typeof 操作符最适合用来判断一个变量是否为原始类型。更确切地说，它是判断一 个变量是否为字符串、数值、布尔值或 undefined 的最好方式。如果值是对象或 null，那么 typeof  返回 "object"。

引用类型就用 instanceof ， 如果变量是给定引用类型的实例，则 instanceof 操作符返回 true。

 typeof 操作符在用于检测函数时也会返回"function"。

## 执行上下文与作用域
在浏览器中，全局上下文就是我们常说的 window 对象，因此所有通过 var 定义的全局变量和函数都会成为 window 对象的属性和方法。

上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数。

每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。

上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）。这个作用域链决定 了各级上下文中的代码在访问变量和函数时的顺序。

### 作用域链增强
虽然执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文），但有其他方式来增强作用域链。

1. try/catch语句的catch块
2. with语句

### 变量声明
在使用 var 声明变量时，变量会被自动添加到最接近的上下文。

如果想让整个对象都不能修改，可以使用 Object.freeze()

## 垃圾回收
如何标记未使用的变量也许有不同的实现方式。不过，在浏览器的发展史上，用到过两种主要的标记策略：标记清理和引用计数。

### 标记清理（最常用）
垃圾回收程序运行的时候，会标记内存中存储的所有变量（记住，标记方法有很多种）。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。

### 引用计数
其思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为 0 的值的内存。

## 内存管理
### 使用const和let
因为const和let都是块级作用域，所以相比于使用var，会更早地让垃圾回收程序进行回收处理。

### 传递参数
原始值是直接复制，引用值是将地址传递过去。

# 第五章
### URL编码
encodeURL：不会编码属于URL组件的特殊字符，比如冒号、斜杠、问号、 井号

decodeURL：解码

encodeURIComponent：会编码它发现的所有非标准字符

decodeURLComponent：解码

### eval()
接收一个要执行的字符串，当解释器发现eval调用时，会将参数解释为实际的代码语句，然后插入到该位置。

通过 eval() 执行的代码属于该调用所在上下文，被执行的代码与该上下文拥有相同的作用域链。

通过 eval() 定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在 eval() 执行的时候才会被创建。

注：在严格模式下，在 eval() 内部创建的变量和函数无法被外部访问。

# 第六章
## Object
在对象字面量表示法中，属性名可以是字符串或数值。

## Array
from()：将可迭代对象转换为数组，第二个参数可以修改数组的值，Array.from({ }, () => { })类似于Array.from().map()。

of()：替代Array.prototype.slice.call(arguments)，可以把一组参数转换为数组。

## 数组索引
可以通过修改length属性，从数组末尾删除或添加元素。

## 检测数组
在只有一个全局作用域的情况下，使用 instanceof 就够了。

如果涉及两个不同的全局执行上下文，就会有两个不同版本的Array构造函数，这时候就需要使用Array.isArray()。

## 排序
sort()会在每一项上调用String()转型函数，然后比较字符串来决定顺序。

## 定型数组
Javascript默认是双精度浮点格式数值，传给WebGL时需要将数值转型为适当格式（C语言风格的浮点值）。

为了避免数值之间转换降低效率，实现了CanvasFloatArray，最终变成了Float32Array。

## ArrayBuffer
Float32Array 实际上是一种“视图”，可以允许 JavaScript 运行时访问一块名为 ArrayBuffer 的预分配内存。ArrayBuffer 是所有定型数组及视图引用的基本单位。

ArrayBuffer()是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间。一经创建就不能修改大小。

不能仅通过对 ArrayBuffer 的引用就读取或写入其内容。要读取或写入 ArrayBuffer，就必须通过视图。视图有不同的类型，但引用的都是 ArrayBuffer 中存储的二进制数据。

## Map
### 内存占用
给定固定大小的内存，Map大约可以比Object多存储50%的键值对。

### 插入性能
Map和Object大致相当，但如果代码涉及大量插入操作，Map性能更佳。

### 查找速度
如果只包含少量的键值对，则Object有时候速度更快。

### 删除性能
如果涉及大量的delete操作，选择Map。

## WeakMap
weak描述的是Javascript垃圾回收程序对待“弱映射”中键的方式。

弱映射中的键只能是Object或者继承自Object的类型，否则会抛出错误，值的类型没有限制。

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用， 不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值 对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

## Set
加强的Map

## WeakSet
弱集合中的值只能是Object或者继承自Object的类型。

# 第七章
## 迭代器
Symbol.iterator

如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。

要知道某个迭代器是否可关闭， 可以测试这个迭代器实例的 return 属性是不是函数对象。

不过，仅仅给一个不可关闭的迭代器增加这个方法并不能让它变成可关闭的。这是因为调用 return()不会强制迭代器进入关闭状态。

## 生成器
拥有在一个函数块内暂停和恢复代码执行的能力。

生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。

**注：箭头函数不能用来定义生成器函数**

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器 开始或恢复执行。

生成器函数只会在初次调用 next() 方法后开始执行。

yield关键字可以让生成器停止和开始执行。

可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象。

```javascript
function* generatorFn() { 
  yield* [1, 2, 3]; 
} 
let generatorObject = generatorFn(); //得到一个可迭代对象
for (const x of generatorFn()) { 
  console.log(x); 
}
```

return()和 throw()方法都可以用于强制生成器进入关闭状态。

所有生成器对象都有 return()方法，只要通过它进入关闭状态，就无法恢复了。

# 第八章
## 数据属性
数据属性包含一个保存数据值的位置，有4个特性：

1. [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
2. [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
3. [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
4. [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为 undefined。

要修改属性的默认特性，就必须使用 Object.defineProperty()方法。这个方法接收 3 个参数： 要给其添加属性的对象、属性的名称和一个描述符对象。

```javascript
Object.defineProperty(person, "name", { 
  writable: false, 
  value: "Nicholas" 
});
```

## 访问器属性
包含一个获取（getter）函数和一个设置（setter）函数，不 过这两个函数不是必需的。

访问器属性是不能直接定义的，必须使用 Object.defineProperty()。

通过Object.defineProperty()定义的属性，如果没有指定数据特性，则默认特性值为false。

## 读取属性的特性
使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。

Object.getOwnPropertyDescriptors()会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。

## 合并对象
Object.assign()实际上对每个源对象执行的是浅复制

## 对象相等判定
Object.is()，这个方法与===很像，并且能够正确判断+0，-0，0是否相等，NaN自身是否相等。

## 创建对象
### 工厂模式
用于抽象创建特定对象的过程。

```javascript
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
 console.log(this.name); 
 }; 
 return o; 
} 
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor"); 
```

问题：没有解决对象标识问题（即新创建的对象是什么类型）

### 构造函数模式
用于创建特定类型对象。

```javascript
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
   console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 
```

使用new操作符，会执行如下操作：

1. 在内存中创建一个对象。
2. 这个新对象内部的__proto__特性被赋值为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象，否则，返回刚创建的新对象。

问题：其定义的方法会在每个实例上都创建一次，导致不同实例上的函数虽然同名却不相等。

解决方法就是将函数定义在构造函数外部，但是会导致全局作用域中定义多个函数，不能将代码很好的聚集在一起。

### 原型模式
任何函数的默认原型都是一个Object实例

```javascript
xxxxx.prototype.__proto__ === Object.prototype
```

#### 构造器的__proto__
```javascript
Number.__proto__ === Function.prototype
Boolean.__proto__ === Function.prototype
String.__proto__ === Function.prototype
Object.__proto__ === Function.prototype
Function.__proto__ === Function.prototype
Array.__proto__ === Function.prototype
RegExp.__proto__ === Function.prototype
Error.__proto__ ==== Function.prototype
Date.__proto__ === Function.prototype
// 特殊对象
Math.__proto__ === Object.prototype
JSON.__proto__ === Object.prototype
```

#### 构造器的原型
```javascript
typeof Function.prototype === "function"
typeof Number.prototype === "object"
typeof Object.prototype === "object"
typeof Boolean.prototype === "object"
typeof String.prototype === "object"
typeof Array.prototype === "object"
typeof RegExp.prototype === "object"
typeof Error.prototype === "object"
typeof Date.prototype === "object"
```

每个函数都会创建一个prototype属性，这个属性是一个对象，这个对象就是通过调用构造函数创建的对象的原型（即 Object.prototype === (new Object()).__proto__），原型对象上定义的方法和属性可以被对象实例共享。

默认情况下，所有prototype会自动获得一个名为constructor的属性，指向与之关联的构造函数。

```javascript
/** 
 * 正常的原型链都会终止于 Object 的原型对象
 * Object 原型的原型是 null 
 */ 
console.log(Person.prototype.__proto__ === Object.prototype); // true 
console.log(Person.prototype.__proto__.constructor === Object); // true 
console.log(Person.prototype.__proto__.__proto__ === null); // true 
```

![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/26361422/1687878136324-101324b2-090b-460e-bb39-1c4f4d865565.jpeg)

为避免使用 Object.setPrototypeOf()可能造成的性能下降，可以通过 Object.create()来创 建一个新对象，同时为其指定原型：  

```javascript
let biped = { 
 numLegs: 2 
}; 
let person = Object.create(biped); 
person.name = 'Matt'; 
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true 
```

 问题：

1. 弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。
2. 原型上的所有属性都是共享的，如果属性的值是个引用值，则所有实例用的都是同一个值。

## 继承
继承主要是通过原型链实现的，基本思想就是通过原型链继承多个引用类型的属性和方法。

所有引用类型都继承自Object，任何函数的默认原型都是一个Object的实例。

### 原型与继承关系
第一种方式是使用instanceof操作符，如果一个实例的原型链中出现过相应的构造函数，则返回true。

第二种方式是使用isPrototypeof()方法，原型链中的每个原型都可以调用这个方法，只要原型链中包含这个原型，这个方法就返回true。

```javascript
console.log(Object.prototype.isPrototypeOf(instance)); // true 
console.log(SuperType.prototype.isPrototypeOf(instance)); // true 
console.log(SubType.prototype.isPrototypeOf(instance)); // true
```

### 盗用构造函数继承
在子类构造函数中调用父类构造函数。

```javascript
function SuperType() { 
 this.colors = ["red", "blue", "green"]; 
} 
function SubType() { 
 // 继承 SuperType 
 SuperType.call(this); 
} 
let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green"
```

问题：

1. 必须在构造函数中定义方法，因此函数不能重用。
2. 子类不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。

### 组合继承
综合了原型链和盗用构造函数。基本思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```javascript
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name);  // 第二次调用
 this.age = age; 
} 
// 继承方法
SubType.prototype = new SuperType();  // 第一次调用
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```

问题：效率问题，父类构造函数始终会被调用两次，一次是在创建子类原型时调用，另一次是在子类构造函数中调用。

### 原型式继承
相当于在一个对象的基础之上再创建一个新对象，新对象的原型为最开始的对象。和Object.create()类似。

```javascript
function object(o) { 
 function F() {} 
 F.prototype = o; 
 return new F(); 
} 
```

### 寄生式继承
创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```javascript
function createAnother(original){ 
 let clone = object(original); // 通过调用函数创建一个新对象，这里object是原型式继承
 clone.sayHi = function() { // 以某种方式增强这个对象
 console.log("hi"); 
 }; 
 return clone; // 返回这个对象
}
```

继承original这个对象。

缺点：通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

### 寄生式组合继承
```javascript
function inheritPrototype(subType, superType) { 
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象 
  subType.prototype = prototype; // 赋值对象
}
```

引用类型继承的最佳模式。

## 类
定义类的两种主要方式：

1. 类声明：`class Person {}`
2. 类表达式：`const Animal = class {}`

与函数的差异：

1. 函数定义可以提升，类定义不能。 
2. 函数受函数作用域限制，类受块作用域限制。

### 实例化
使用new调用类的构造函数：

1. 在内存中创建一个新对象。
2. 这个新对象内部的__proto__指针被赋值为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象。
4. 执行构造函数内部的代码。
5. 如果构造函数返回非空对象，则返回该对象，否则返回刚创建的对象。

### 静态类方法
静态类成员在类定义中使用static关键字作为前缀，静态类方法中的`this`指向类自身。

### 继承
通过extends关键字继承，可以继承一个类或者普通的构造函数。

#### super()
派生类的方法可以通过super关键字引用他们的原型，仅限于constructor，静态方法内部。

1. 在constructor中使用super可以调用父类构造函数，不要在调用super()之前引用this，会报错。

```javascript
class A {
	constructor() {
    this.name = 'a'
  }
}
class B extends A {
  constructor() {
    super() //相当于super.constructor()
    console.log(this instanceof A) // true
    console.log(this) //B { name: 'a' }
  }
}
new B()
```

2. 静态方法中通过super调用

```javascript
class Vehicle { 
 static identify() { 
 console.log('vehicle'); 
 } 
} 
class Bus extends Vehicle { 
 static identify() { 
 super.identify(); 
 } 
} 
Bus.identify(); // vehicle
```

使用super注意事项：

1. super只能在派生类构造函数和静态方法中使用。
2. 不能单独引用super关键字，要么调用构造函数，要么调用静态方法。
3. 调用super()会调用父类构造函数，并将返回的实例赋值给this。
4. super()的行为如同调用构造函数，传参需要手动传入。
5. 如果派生类没有定义类构造函数，在实例化派生类时会调用super()，并且会传入所有传给派生类的参数。
6. 在类构造函数中，不能在调用super()之前引用this。
7. 如果在派生类中显示定义了构造函数，则要么必须在其中调用super()，要么必须在其中返回一个对象。

```javascript
class Vehicle {} 
class Car extends Vehicle {} 
class Bus extends Vehicle { 
 constructor() { 
 super(); 
 } 
} 
class Van extends Vehicle { 
 constructor() { 
 return {}; 
 } 
} 
console.log(new Car()); // Car {} 
console.log(new Bus()); // Bus {} 
console.log(new Van()); // {} 
```

#### 抽象基类
它可供其他类继承，但本身不会被实例化。

通过在实例化时检测new.target是不是抽象基类，可以阻止实例化。

new.target保存了通过new关键字调用的类或函数。

```javascript
// 假如Vehicle是抽象基类 
class Vehicle { 
 constructor() { 
 console.log(new.target); 
 if (new.target === Vehicle) { 
 throw new Error('Vehicle cannot be directly instantiated'); 
 } 
 } 
} 
// 派生类
class Bus extends Vehicle {} 
new Bus(); // class Bus {} 
new Vehicle(); // class Vehicle {} 
// Error: Vehicle cannot be directly instantiated
```

可以在抽象基类中要求派生类必须定义某个方法，因为原型方法在调用类构造函数之前就已经存在了。

#### 继承内置类型
有些内置类型的方法会返回新实例。默认情况下，返回实例的类型与原始实例的类型一致。

```javascript
class SuperArray extends Array {} 
let a1 = new SuperArray(1, 2, 3, 4, 5); 
let a2 = a1.filter(x => !!(x%2)) 
console.log(a1); // [1, 2, 3, 4, 5] 
console.log(a2); // [1, 3, 5] 
console.log(a1 instanceof SuperArray); // true 
console.log(a2 instanceof SuperArray); // true
```

通过Symbol.species访问器，可以决定在创建返回的实例时使用的类。

```javascript
class SuperArray extends Array { 
 static get [Symbol.species]() { 
 return Array; 
 } 
} 
let a1 = new SuperArray(1, 2, 3, 4, 5); 
let a2 = a1.filter(x => !!(x%2)) 
console.log(a1); // [1, 2, 3, 4, 5] 
console.log(a2); // [1, 3, 5] 
console.log(a1 instanceof SuperArray); // true 
console.log(a2 instanceof SuperArray); // false
```

注：很多 JavaScript 框架（特别是 React）已经抛弃混入模式，转向了组合模式（把方法提取到独立的类和辅助对象中，然后把它们组合起来，但不使用继承）。这反映了那个众所周知的软件设计原则：“组合胜过继承”这个设计原则被很多人遵循，在代码设计中能提供极大的灵活性。

# 第九章
## 代理基础
代理是目标对象的抽象，它可以用作目标对象的替身，但又完全独立于目标对象。

### 创建空代理
使用proxy构造函数创建。接受两个参数：目标对象和处理程序对象。

创建空代理，可以传一个简单的对象字面量作为处理程序对象。

`const proxy = new Proxy(target, {})`

### 定义捕获器
使用代理的主要目的是可以定义捕获器。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器，从而拦截并修改相应的行为。例如：get()

#### 参数
get捕获器会接收到目标对象、要查询的属性和代理对象三个参数。可以通过这三个参数重建原始操作。

#### 反射API
处理程序对象中所有可以捕获的方法都有相应的反射（Reflect）API方法。这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有与被拦截方法相同的行为。

通过反射API可以用最少的代码修改捕获的方法。

```javascript
const target = { 
 foo: 'bar', 
 baz: 'qux' 
}; 
const handler = { 
 get(trapTarget, property, receiver) { 
 let decoration = ''; 
 if (property === 'foo') { 
 decoration = '!!!'; 
 } 
 return Reflect.get(...arguments) + decoration; 
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar!!! 
console.log(target.foo); // bar 
console.log(proxy.baz); // qux 
console.log(target.baz); // qux 
```

### 捕获器不变式
如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，就会报错。

### 可撤销代理
Proxy提供了revocable()方法，支持撤销代理对象与目标对象的关联。

```javascript
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get() { 
 return 'intercepted'; 
 } 
}; 
const { proxy, revoke } = Proxy.revocable(target, handler); 
console.log(proxy.foo); // intercepted 
console.log(target.foo); // bar 
revoke(); 
console.log(proxy.foo); // TypeError
```

### 实用反射API
#### 状态标记
很多反射API返回“状态标记”的布尔值，表示操作是否成功。这比那些返回修改后的对象或者抛出错误更有用。

```javascript
// 初始代码 
const o = {}; 
try { 
 Object.defineProperty(o, 'foo', 'bar'); 
 console.log('success'); 
} catch(e) { 
 console.log('failure'); 
} 

// 重构后的代码
const o = {}; 
if(Reflect.defineProperty(o, 'foo', {value: 'bar'})) { 
 console.log('success'); 
} else { 
 console.log('failure'); 
} 
```

以下反射方法都会提供状态标记：

1.  Reflect.defineProperty()
2. Reflect.preventExtensions()
3. Reflect.setPrototypeOf()
4. Reflect.set()
5. Reflect.deleteProperty()

#### 代替操作符
1.  Reflect.get()：可以替代对象属性访问操作符。
2. Reflect.set()：可以替代=赋值操作符。
3. Reflect.has()：可以替代 in 操作符或 with()。
4. Reflect.deleteProperty()：可以替代 delete 操作符。
5. Reflect.construct()：可以替代 new 操作符。

#### 安全地调用函数
在通过apply方法调用函数时，被调用的函数有可能也定义了自己的apply函数。可以使用定义在Function原型上的apply方法

```javascript
Function.prototype.apply.call(myFunc, thisVal, argumentList);
```

也可以用`Reflect.apply`

```javascript
Reflect.apply(myFunc, thisVal, argumentsList)
```

### 代理的问题
#### 代理中的this
this指向这个代理对象。如果目标对象依赖于对象标识，就会出问题。

```javascript
const wm = new WeakMap(); 
class User { 
 constructor(userId) { 
 wm.set(this, userId); 
 } 
 set id(userId) { 
 wm.set(this, userId); 
 } 
 get id() { 
 return wm.get(this); 
 } 
}
const user = new User(123); 
console.log(user.id); // 123 
const userInstanceProxy = new Proxy(user, {}); 
console.log(userInstanceProxy.id); // undefined

// 修改后
const UserClassProxy = new Proxy(User, {})
const proxyUser = new UserClassProxy(456)
console.log(proxyUser.id)
```

因为wm中的key是目标对象，而通过`userInstanceProxy.id`调用get id()时，this指向`userInstanceProxy`，要解决这个问题，把代理User实例改为代理User类本身。

#### 代理与内部槽位
有些内置类型可能会依赖代理无法控制的机制。

例如：Date类型方法的执行依赖this值上的内部槽位`[[NumberDate]]`，代理对象上不存在这个内部槽位，而且这个值也不能通过普通的get()和set()操作访问到，所以或直接报错。

```javascript
const target = new Date(); 
const proxy = new Proxy(target, {}); 
console.log(proxy instanceof Date); // true 
proxy.getDate(); // TypeError: 'this' is not a Date object
```

## 代理捕获器与反射方法
## 代理模式
### 跟踪属性访问
```javascript
const user = {
  name: 'Jake'
}
const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`)
    return Reflect.get(...arguments)
  }
  // set(), has()等操作
})
```

### 隐藏属性
通过 get() 判断返回undefined，has() 判断返回 false ，来实现隐藏属性。

### 属性验证
所有赋值都会触发 set() ，所以可以通过它决定是否允许还是拒绝赋值。

# 第十章
可以使用Function构造函数。这个构造函数接受任意多个字符串参数，最后一个参数始终会被当成函数体，而之前的参数都是新函数的参数。

```javascript
let sum = new Function("num1","num2","return num1 + num2")
```

不推荐使用。因为这段代码会被解释两次。

1. 将它当作常规ECMAScript代码
2. 解释传给构造函数的字符串

## 箭头函数
箭头函数不能使用arguments、super和new.target，也不能用作构造函数，此外也没有prototype属性。

## 函数名
所有的函数对象都会暴露一个只读的name属性。保存的就是一个函数的标识符。如果函数没有名称，则显示空字符串，如果是使用Function构造函数创建的，则会标识成“anonymous”。如果函数是一个获取函数，设置函数，或者使用bind()实例化，那么标识符前面还会加上一个前缀。

## 理解参数
函数不关心传入的参数个数，也不关心参数的数据类型。因为函数的参数在内部表现为一个数组，在使用function关键字定义函数时，可以在函数内部访问arguments对象，从中取得传进来的每个参数值。

arguments是一个类数组对象（不是Array的实例）因此可以使用中括号语法访问，也可以使用length属性。

arguments对象的值会自动同步到对应的命名参数，但是在内存中它们是分开的，只是会保持同步而已。（严格模式下不能重写arguments）

## 函数声明与函数表达式
JS引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义。（这个过程叫做函数声明提升）而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。

## 函数内部
### arguments
类数组对象，包含调用函数时传入的所有参数。只有以function关键字定义的函数才会有。

arguments还有一个callee属性，指向原函数本身。（严格模式下不能使用）

### this
在标准函数中，this指向调用函数的上下文对象。全局上下文时为windows。

在箭头函数中，this指向的是定义箭头函数的上下文。

在事件回调或定时回调中调用某个函数，this指向的并非想要的对象，此时将回调函数写成箭头函数就可以解决问题。

### caller
函数对象上的属性caller，指向的是调用当前函数的函数，如果在全局作用域中调用的则为null。

### new.target
检测函数是否使用new关键字调用，如果是正常调用的，则为undefined，否则将指向被调用的构造函数。

```javascript
function King() { 
 if (!new.target) { 
 throw 'King must be instantiated using "new"' 
 } 
 console.log('King instantiated using "new"'); 
} 
new King(); // King instantiated using "new" 
King(); // Error: King must be instantiated using "new"
```

## 函数的属性和方法
函数有两个属性：length、prototype

length表示命名参数的个数。

prototype是保存引用类型所有实例方法的地方。

函数还有两个方法：`apply()`和`call()`

### apply
接收两个参数，函数内this的值和一个参数数组。第二个参数可以是Array实例，也可以是arguments对象。

### call
call与apply作用一样，只是传参的形式不同，第一个参数和apply一样，剩下的要传给被调用函数的参数则是逐个传递的。

### bind
ES5定义的新方法，该方法会创建一个新的函数实例，其this值会被绑定到传给bind的对象。

## 函数表达式
通过函数表达式创建的函数叫作匿名函数（兰姆达函数）。

## 尾调用优化
```javascript
function A() { 
 return B(); // 尾调用
}
```

### ES6优化前
1. 执行到A函数体，第一个栈帧被推到栈上。
2. 执行A函数体，到return语句，计算返回值必须先计算B。
3. 执行到B函数体，第二个栈帧被推到栈上。
4. 执行B函数体，计算其返回值。
5. 将返回值传回A，然后A再返回值。
6. 将栈帧弹出栈外。

### 优化后
1. 执行到A函数体，第一个栈帧被推到栈上。
2. 执行A函数体，到达return语句，计算B。
3. 引擎发现把第一个栈帧弹出栈外也没问题，因为B的返回值也是A的返回值。
4. 弹出A的栈帧。
5. 执行到B函数体，栈帧被推到栈上。
6. 执行B函数体，计算其返回值。
7. 将B的栈帧弹出栈外。

如果函数的逻辑允许基于尾调用将其销毁，则引擎会那么做。

### 尾调用条件
1. 代码再严格模式下执行。
2. 外部函数的返回值是对尾调用函数的调用。
3. 尾调用函数返回后不需要执行额外的逻辑。
4. 尾调用函数不是引用外部函数作用域中自由变量的闭包。



## 闭包
闭包是指那些引用了另一个函数作用域中变量的函数。通常是在嵌套函数中实现的。

### this
在闭包中使用 this 会让代码变复杂。如果内部函数没有使用箭头函数定义，则 this 对象会在运行时绑定到执行函数的上下文。如果在全局函数中调用，则 this 在非严格模式下等于 window，在严格模式下等于 undefined。如果作为某个对象的方法调用，则 this 等于这个对象。匿名函数在这种情况下不会绑定到某个对象，这就意味着 this 会指向 window，除非在严格模式下 this 是undefined。

```javascript
window.identity = "The Window"
let object = {
  identit: "My Object",
  getIdentity() {
    return this.identity
  }
}
object.getIdentity() // "My Object"
(object.getIdentity)() // "My Object"
(object.getIdentity = object.getIdentity)() // "The Window"
```

第二行在调用时把 object.getIdentity 放在了括号里。虽然加了括号之后看起来是对一个函数的引用，但 this 值并没有变。这是因为按照规范，object.getIdentity 和 (object.getIdentity)是相等的。第三行执行了一次赋值，然后再调用赋值后的结果。因为赋值表达式的值是函数本身，this 值不再与任何对象绑定，所以返回的是"The Window"。

### 内存泄漏
```javascript
// 以下函数内存在循环引用
// element绑定了一个onclick事件，该匿名函数又引用了element
// 所以只要这个匿名函数存在，element的计数就至少等于1，内存不会被回收。
function fun() {
  let element = document.getElementById('id')
  element.onclick = () => console.log(element.id)
}

// 更改后
function fun() {
  let element = document.getElementById('id')
  let id = element.id
  element.onclick = () => console.log(id)
  element = null
}
```



## 立即调用的函数表达式
使用它可以模仿块级作用域，即在一个函数表达式内部声明的变量，然后立即调用这个函数。在外面调用就会报错。

```javascript
(function() {})()
```

## 私有变量
严格来讲，JavaScript没有私有成员，所有对象属性都是公有的。但是有私有变量的概念。

任何定义在函数或块中的变量，都可以认为是私有的，因为在函数或块之外无法访问。

私有变量包括函数参数、局部变量、以及函数内部定义的其他函数。

通过作用域链的特点，可以创建访问私有变量的公有方法。

### 特权方法
能够访问函数私有变量的公有方法。

#### 方法一
在构造函数中实现

```javascript
// 利用函数闭包的特性
function MyObject() {
  let name = 'myobject'
  this.setName = function(val) {
    name = val
  }
  this.getName = function() {
    return name
  }
}
```

#### 方法二
通过私有作用域定义私有变量和函数来实现

```javascript
(function() { 
  // 私有变量和私有函数
  let privateVariable = 10; 
  function privateFunction() { 
    return false; 
  } 
  // 构造函数，MyObject没有使用任何关键字，所以会创建在全局中
  MyObject = function() {}; 
  // 公有和特权方法
  MyObject.prototype.publicMethod = function() { 
    privateVariable++; 
    return privateFunction(); 
  }; 
})()
```

#### 总结
两个的区别是，方法二私有变量和私有函数是由实例共享的，因为特权方法作为一个闭包，始终引用着包含它的作用域。



### 模块模式
使用了匿名函数返回一个对象，在一个单例对象上实现了相同的隔离和封装。

```javascript
let application = function() { 
  // 私有变量和私有函数 
  let components = new Array(); 
  // 初始化
  components.push(new BaseComponent()); 
  // 公共接口
  return { 
    getComponentCount() { 
      return components.length; 
    }, 
    registerComponent(component) { 
      if (typeof component == 'object') { 
        components.push(component); 
      } 
    } 
  }; 
}();
```

### 模块增强模式
另一个利用模块模式的做法是在返回对象之前先对其进行增强。这适合单例对象需要是某个特定类型的实例，但又必须给它添加额外属性或方法的场景。

```javascript
let singleton = function() { 
  // 私有变量和私有函数
  let privateVariable = 10; 
  function privateFunction() { 
    return false; 
  } 
  // 创建对象
  let object = new CustomType(); 
  // 添加特权/公有属性和方法
  object.publicProperty = true; 
  object.publicMethod = function() { 
    privateVariable++; 
    return privateFunction(); 
  }; 
  // 返回对象
  return object; 
}();
```

# 第十一章
## 异步编程
1. 为了优化因计算量大而时间长的操作。
2. 不想为等待某个一部操作而阻塞线程执行。

### 同步行为
对应内存中顺序执行的处理器指令，每条指令执行后也能立即获得存储在系统本地的信息。

### 异步行为
类似于系统中断，即当前进程外部的实体可以出发代码执行。

### 以往的异步编程模式
早期只支持回调函数来表明异步操作完成，由于串联异步操作，通常需要深度嵌套的回调函数（回调地狱）来解决。

通过回调函数来将这个异步函数里的值传递给需要它的地方，异步操作的失败也需要在回调模型中考虑，所以出现了成功回调和失败回调。

```javascript
function double(value, success, failure) { 
  setTimeout(() => { 
    try { 
      if (typeof value !== 'number') { 
        throw 'Must provide number as first argument'; 
      } 
      success(2 * value); 
    } catch (e) { 
      failure(e); 
    } 
  }, 1000); 
}
```

## Promise
### 基础
#### 状态
1. 待定pending
2. 兑现fulfilled（有时候也成为“解决”，resolved）
3. 拒绝rejected

pending是Promise的最初始的状态，最后以fulfilled或者rejected结束，状态变化是不可逆的。同时，也不能保证Promise一定不是pending状态。

Promise状态是私有的，主要是为了避免根据读取到的Promise状态，以同步方式处理Promise对象。并且外部也不能修改Promise的状态。

#### 解决值、拒绝理由及Promise用例
Promise主要又两大用途

1. 抽象的表示一个异步操作。
2. Promise封装的异步操作会实际生成某个值，程序期待Promise状态改变时可以访问这个值，或者拒绝时可以拿到拒绝的理由。

为了支持这两种用例，每个Promise只要状态切换为fulfilled，就会有一个私有的内部值。只要切换为rejected，就会有也给私有的内部理由。这个值都是不可修改的引用，默认值为undefined。

#### 通过执行函数控制Promise状态
内部操作在Promise的执行器函数中完成，执行器函数主要有两项职责，初始化Promise的异步行为和控制状态的最终转换。执行器函数是同步执行的。这是因为执行器函数是Promise的初始化程序。

#### Promise.resolve()
对于静态方法来说，传入的参数本身是一个Promise，那它的行为就类似于一个空包装。这个方法可以说是一个幂等方法，幂等性会保留传入Promise的状态。

```javascript
let p = Promise.resolve(7); 
setTimeout(console.log, 0, p === Promise.resolve(p)); 
// true 
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))); 
// true
```

#### Promise.reject()
通过它抛出的异步错误不能被try/catch捕获，只能通过reject处理程序捕获。Promise.reject()没有幂等逻辑，如果传给它一个Promise对象，会成为它返回reject Promise的理由。

#### 同步/异步执行的二元性
```javascript
try { 
  throw new Error('foo'); 
} catch(e) { 
  console.log(e); // Error: foo 
} 
try { 
  Promise.reject(new Error('bar')); 
} catch(e) { 
  console.log(e); 
} 
// Uncaught (in promise) Error: bar
```

try/catch没有捕获到Promise的错误，是因为它没有通过异步模式捕获错误。

从这里就可以看出，Promise是同步对象（在同步模式中使用），但也是异步执行模式的媒介。

Promise.reject()没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。



### Promise的实例方法
#### Thenable接口
ECMScript暴露的异步结构中，任何对象都有一个then()方法。

#### Promise.prototype.then()
接收最多两个参数，onResolved函数和onRejected函数。这两个函数是互斥的。

#### Promise.prototype.catch()
只接收一个参数： onRejected处理程序。

#### Promise.prototype.finally()
 给Promise添加 onFinally 处理程序。不管resolved还是rejected都会执行。

#### 非重入Promise方法
当Promise状态确定之后，与该状态相关的处理程序仅仅会被排期，而非立即执行，跟在添加这个处理程序的代码之后的同步代码一定会在处理程序之前先执行。这个特性由JavaScript运行时保证，被称为“非重入”特性。

#### 邻近处理程序的执行顺序
如果给Promise添加了多个处理程序，当Promise状态变化时，它们会顺序依次执行。

```javascript
let p1 = Promise.resolve(); 
let p2 = Promise.reject(); 
p1.then(() => setTimeout(console.log, 0, 1)); 
p1.then(() => setTimeout(console.log, 0, 2)); 
// 1 
// 2 
p2.then(null, () => setTimeout(console.log, 0, 3)); 
p2.then(null, () => setTimeout(console.log, 0, 4)); 
// 3 
// 4 
p2.catch(() => setTimeout(console.log, 0, 5)); 
p2.catch(() => setTimeout(console.log, 0, 6)); 
// 5 
// 6 
p1.finally(() => setTimeout(console.log, 0, 7)); 
p1.finally(() => setTimeout(console.log, 0, 8)); 
// 7 
// 8
```

#### 传递解决值和拒绝理由
解决值和拒绝理由分别作为resolve()和reject()的第一个参数往后传的，作为onResolved或onRejected的唯一参数。

#### 拒绝Promise与拒绝错误处理
类似于throw()表达式，在Promise的执行函数或处理程序中抛出错误会导致拒绝。

### Promise连锁与合成
#### Promise连锁
因为每个Promise实例的方法都会返回一个新的Promise对象，而这个新Promise又有自己的实例方法。

#### Promise图
因为一个Promise可以有任意多个处理程序，所以Promise连锁可以构建有向非循环图的结构。

```javascript
// 	  	A 
//  	 / \ 
//  	B   C 
//   /\   /\ 
//	D  E F  G 
let A = new Promise((resolve, reject) => { 
 console.log('A'); 
 resolve(); 
}); 
let B = A.then(() => console.log('B')); 
let C = A.then(() => console.log('C')); 
B.then(() => console.log('D')); 
B.then(() => console.log('E')); 
C.then(() => console.log('F')); 
C.then(() => console.log('G')); 
```

#### Promise.all()和Promise.race()
这两个静态方法可以将多个Promise实例组合成一个Promise，组合成的Promise的行为取决于内部Promise的行为。

##### Promise.all()
通过它创建的Promise会在一组Promise全部解决后再解决。这个方法接收一个可迭代对象，返回一个新Promise。

如果至少有一个包含的Promise待定，则合成的Promise也会待定，如果有一个包含的Promise拒绝，则合成的Promise也会拒绝。

如果所有Promise都成功，则合成Promise的解决值就是包含所有Promise解决值的数组，按照迭代器顺序。

```javascript
let p1 = Promise.all([ 
 Promise.resolve(), 
 Promise.resolve() 
]); 
// 可迭代对象中的元素会通过 Promise.resolve()转换为期约
let p2 = Promise.all([3, 4]); 
// 空的可迭代对象等价于 Promise.resolve() 
let p3 = Promise.all([]); 
// 无效的语法
let p4 = Promise.all(); 
// TypeError: cannot read Symbol.iterator of undefined  
```

##### Promise.race()
接收一个可对待对象，返回一个包装Promise，是一组集合中最先解决或拒绝的Promise的镜像。

```javascript
let p1 = Promise.race([ 
 Promise.resolve(), 
 Promise.resolve() 
]); 
// 可迭代对象中的元素会通过 Promise.resolve()转换为期约
let p2 = Promise.race([3, 4]); 
// 空的可迭代对象等价于 new Promise(() => {}) 
let p3 = Promise.race([]); 
// 无效的语法
let p4 = Promise.race(); 
// TypeError: cannot read Symbol.iterator of undefined 
```

### Promise扩展
#### Promise取消
某些第三方库（Bluebird）提供了这个特性。

在现有基础上提供一种临时的封装，以实现取消Promise的功能。

```javascript
class CancelToken {
  constructor(cancelFun) {
    this.promise = new Promise((resolve, reject) => {
      cancelFun(() => {
        // 取消之前做点什么，如果需要取消则resolve，不需要则reject
        // ...
        if (cancelStatus) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}

function cancelDelayResolved(delay) {
  return new Promise((resolve, reject) => {
    // setTimeout内部才是最终需要延时执行的逻辑
    const id = setTimeout(() => {
      if (success) {
        resolve(1);
      } else {
        reject();
      }
    }, delay);
    const cancelToken = new CancelToken((canFun) => {
      canFun();
    });
    cancelToken.promise.then(() => clearTimeout(id));
  });
}
const a = cancelDelayResolved(1000);
// 如果取消了，则a对象为pending状态

```

#### Promise进度通知
```javascript
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = [];
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        notifyHandlers.map((hander) => hander(status));
      });
    });
    this.notifyHandlers = notifyHandlers;
  }
  notify(notifyHandlers) {
    this.notifyHandlers.push(notifyHandlers);
    return this;
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countdown(x - 1), 1000);
    } else {
      resolve();
    }
  }
  setTimeout(() => countdown(5));
});

p.notify((x) => console.log(`a: ${x}`)).notify((x) => console.log(`b: ${x}`));
p.then(() => console.log("completed"));
// a: 100% remaining
// b: 100% remaining
// a: 80% remaining
// b: 80% remaining
// a: 60% remaining
// b: 60% remaining
// a: 40% remaining
// b: 40% remaining
// a: 20% remaining
// b: 20% remaining
// completed
```

## 异步函数
使用 async/await，让以同步写的代码能够异步执行。

### async
用于声明异步函数，可以用在函数声明、函数表达式、箭头函数和方法上。

让函数具有异步特征，但总体上代码仍然是同步求值的。

如果函数使用return返回了值，会被Promise.resolve()包装成一个Promise对象。

### await
使用它可以暂停异步函数代码的执行，等待Promise解决。

await会暂停执行异步函数后面的代码，让出JavaScript运行时的执行线程，与生成器函数中的yield一样。await同样是尝试“解包”对象的值，然后将这个值传给表达式，再异步恢复异步函数的执行。

对拒绝的Promise使用await则会释放错误值，后续的代码不再执行，而对解决的Promise使用await则会继续执行。

```javascript
// 等待一个实现了thenable接口的非Promise对象
async function baz() {
  const thenable = {
    then(callback) {
      callback("baz");
    },
  };
  console.log(await thenable);
}
baz();
// baz
```

### await限制
await必须在异步函数中使用，不能再顶级上下文如<script>标签或模块中使用。

但是某些环境（浏览器，node的某些版本）是可以在全局使用await的，但这不是标准的JavaScript行为，可能会导致跨环境兼容性问题。  


### 停止和恢复执行
async/await中真正起作用的是await。async只是一个标识符。因为异步函数如果不包含await关键字，其执行基本上和普通函数没有区别。

JavaScript运行时遇到await关键字时，会记录在哪里暂停执行，等到await右边的值可用了，JavaScript运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。因此，即使await后面跟着一个立即可用的值，函数的其余部分有也会被异步求值。

```javascript
async function foo() {
  console.log(2);
  console.log(await Promise.resolve(8));
  console.log(9);
}
async function bar() {
  console.log(4);
  console.log(await 6);
  console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 8
// 9
// 6
// 7
```

### 异步函数策略
#### 实现sleep()
```javascript
async function sleep(delay) { 
 return new Promise((resolve) => setTimeout(resolve, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 await sleep(1500); // 暂停约 1500 毫秒
 console.log(Date.now() - t0); 
} 
foo();
```

#### 利用平行执行
```javascript
// 在await时才创建Promise并等待，所以当前一个Promise返回时才创建下一个Promise，保证了顺序
// 但是这样总执行时间会变长
async function randomDelay(id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${id} finished`);
      resolve();
    }, delay)
  );
}
async function foo() {
  const t0 = Date.now();
  for (let i = 0; i < 5; ++i) {
    await randomDelay(i);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished 
// 1 finished 
// 2 finished 
// 3 finished 
// 4 finished 
// 877ms elapsed

// 如果不需要关心顺序，可以先把Promise都初始化了
async function randomDelay(id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${id} finished`);
      resolve();
    }, delay)
  );
}
async function foo() {
  const t0 = Date.now();
  const promises = Array(5)
    .fill(null)
    .map((_, i) => randomDelay(i));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 4 finished 
// 2 finished 
// 1 finished 
// 0 finished 
// 3 finished 
// 877ms elapsed 
```



# 第十二章
## window对象
BOM的核心，表示浏览器的实例

一是代表ECMAScript中的Global对象，二是浏览器窗口的JavaScript接口。

### Global作用域
因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函 数都会变成 window 对象的属性和方法。

### 窗口关系
top对象始终指向最上层窗口，即浏览器窗口本身，而parent对象则始终指向当前窗口的父窗口。如果当前窗口时最上层窗口，则parent === top，parent === window。最上层的window如果不是通过window.open()打开的，那么其name属性就不会包含值。

还有一个self对象，始终指向window，实际上 self 和window 就是同一个对象。之所以暴露self，就是为了和top，parent保持一致。

这些属性都是window对象的属性，这意味着可以把访问多个窗口的window对象串联起来。

### 窗口位置与像素比
可以使用screenLeft和screenTop属性查看窗口相对于屏幕左侧和顶部的位置，返回值的单位是CSS像素。

#### 像素比
CSS像素是Web开发中使用的统一像素单位。这个单位背后是一个角度：0.0213°。如果屏幕距离人眼是一臂长，则以这个角度计算的CSS像素大小约为1/96英寸。这样定义像素大小是为了在不同设备上同意标准。

比如：低分辨率平板设备上12像素的文字应该与高清4K屏幕下12像素的文字具有相同大小。

这就引发了一个问题，不同像素密度就会有不同的缩放系数，以便把物理像素（屏幕实际分辨率）转换为CSS像素（浏览器报告的虚拟分辨率）。

例如：手机屏幕的物理分辨率可能是1920*1080，但因为其像素可能非常小，所以浏览器就需要将其分辨率降低为较低的逻辑分辨率，比如640*320。这个物理像素与CSS像素之间的转换比率由 window.devicePixelRatio属性提供。例子上的这个设备的 devicePixelRatio 的值为3，这样一来，12像素的文字实际上就会用36像素的物理像素来显示。

window.devicePixelRatio实际上与每英寸像素数（DPI）是对应的，DPI表示单位像素密度，而 window.devicePixelRatio 表示物理像素与逻辑像素之间的缩放系数。

### 窗口大小
innerWidth、innerHeight返回浏览器窗口中页面视口的大小

outerWidth、outerHeight返回浏览器窗口自身的大小（不管是最外层的window，还是frame）

document.documentElement.clientWidth 和 document.documentElement.clientHeight 返回页面时刻的宽度和高度。

### 视口位置
window.pageXoffset === window.scrollX

windwo.pageYoffset === window.scrollY

可以使用scroll()，scrollBy()，scrollTo() 这三个方法滚动页面。



