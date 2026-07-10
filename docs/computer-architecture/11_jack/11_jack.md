# 11. Jack

Jack 是一门教学用高级语言，长得像 C，但被刻意简化，方便我们把它编译成 Hack VM，再继续编译成 Hack assembly 和 Hack machine code。

完整链路：

```text
Jack source code
    ↓ compiler
Hack VM
    ↓ VM translator
Hack Assembly
    ↓ assembler
Hack machine code
    ↓
Hack CPU
```

:::danger 重点
考试重点不是会不会写 Jack 程序，而是能不能解释 Jack 如何被编译到 VM：语法限制、符号表、对象布局、方法调用、构造器、字符串和 VM 代码生成。
:::

## 11.1. Jack Language Overview

Jack 是 C-like language，但比 C 简化很多。

它的目的：

1. 让高级语言能跑在 Hack 机器上。
2. 让 compiler 足够简单，可以在课程里实现。
3. 用少量语言特性覆盖变量、函数、控制流、对象、数组和字符串。

核心编译路径：

```text
Jack -> VM -> Hack assembly -> machine code
```

## 11.2. Variables, Statements, Comments

### 11.2.1 Variable declarations

Jack 声明变量必须写 `var`：

```text
var int x;
var char a, b, c;
```

不像 C：

```c
int x;
```

Jack 不能边声明边赋值：

```text
var int x = 0;  // wrong
```

正确写法：

```text
var int x;
let x = 0;
```

所有局部变量必须在函数开头一次性声明完，不能写到函数中间。这样 compiler 一进函数就知道 local segment 需要多大。

### 11.2.2 Assignment

赋值语句用 `let`：

```text
let x = 5;
let c = "z";
```

没有：

```text
x += 5;
```

### 11.2.3 Comments

注释和 C 类似：

```text
// single-line comment
/* multi-line comment */
```

Jack 语句真正靠 `;` 分隔，空格和换行大多被忽略。

:::danger 变量声明
Jack 变量声明写成 `var type name;`，赋值写 `let name = expr;`，所有 local variables 必须在函数开头声明完。
:::

## 11.3. Functions and `do`

函数声明：

```text
function int Main.max(int x, int y) {
  ...
}

function void Main.print(String s) {
  ...
}
```

格式：

```text
function keyword + return type + ClassName.functionName + parameter list
```

返回：

```text
return 42;
return;
```

和 C 不同，即使是 `void` function，也必须写：

```text
return;
```

如果只调用函数、不关心返回值，必须用 `do`：

```text
do Main.print("Hello, world!");
```

原因：compiler 一看到 `do` 就知道这是一个“调用并丢弃返回值”的 statement。

:::warning `do`
VM 里所有 subroutine call 都会留下返回值。Jack 的 `do f();` 表示调用后不要返回值，所以编译时要 `pop temp 0` 把返回值丢掉。
:::

## 11.4. Expressions

Expression 是能算出值的东西。

Jack 支持：

1. Literals：`5`、`true`、`"Hello"`。
2. Variables。
3. Function calls。
4. Array indexing：`a[i]`。
5. Parentheses：`(expr)`。

支持的运算：

| Kind | Operators |
|---|---|
| Arithmetic | `+`、`-`、`*`、`/` |
| Logic / bitwise | `&`、`|`、`~` |
| Comparison | `=`、`>`、`<` |

注意：Jack 里一个等号 `=` 表示 equality comparison。

不支持：

1. `%`
2. `<<` / `>>`
3. address-of / dereference
4. `++` / `--`
5. `!=` / `<=` / `>=`
6. ternary `?:`
7. expression 中赋值

### 11.4.1 No operator precedence

Jack 没有运算符优先级。

```text
1 + 2 * 3
```

标准不保证它按数学优先级算。程序员必须写括号：

```text
1 + (2 * 3)
(1 + 2) * 3
```

:::danger 表达式
Jack 支持基本算术、逻辑和比较，但没有运算符优先级。需要优先级时必须自己加括号。
:::

## 11.5. Control Flow

Jack 只有：

```text
if (expr) {
  ...
} else {
  ...
}

while (expr) {
  ...
}
```

不支持：

1. `else if`
2. `for`
3. `do ... while`

`else if` 要写成嵌套：

```text
if (x) {
  ...
} else {
  if (y) {
    ...
  }
}
```

`while` 足够表达循环，所以语言仍然足够强。

## 11.6. Types and Implicit Conversion

Jack 类型系统很简单：

1. `int`
2. `char`
3. `boolean`
4. class types

没有 explicit casting。

`int` / `char` / `boolean` 在内存里基本都按整数存：

```text
true  = -1
false = 0
char  = Hack character code
```

例子：

```text
var int x;
var boolean y;
var char z;

let x = -1;
let y = x;       // true
let z = x + 71;  // character code
```

Compiler 可以直接按 integer 存取，很多 conversion 等于什么都不用做。

:::warning 类型
Jack 不做复杂类型系统。`int/char/boolean` 底层都是 word，只是解释方式不同。
:::

## 11.7. Classes, Fields, Statics

Jack 用 class 替代 C 的 struct，但没有完整 Java 式 OOP：

1. 没有 inheritance。
2. 没有 `public` / `private` / `protected`。
3. 相关 subroutines 写在 class 内部。

字段：

```text
class Foo {
  field int x;
  field int y;
}
```

`field` 表示每个 object 自己有一份。

静态变量：

```text
class Foo {
  static int count;
}
```

`static` 表示所有 `Foo` objects 共享一份。

类变量声明：

```text
var Foo myFoo;
```

Jack 没有：

```text
myFoo.x
```

字段通常通过 method 访问。

:::danger class
Jack class 基本是 struct + 相关函数 + field/static。`field` 属于对象实例，`static` 属于整个类。
:::

## 11.8. Methods and `this`

Method 是属于某个 class instance 的 function。

在 method 里：

1. field variables 可以像 local 一样直接用名字。
2. 当前对象通过 `this` 访问。
3. `methodCall()` 等价于 `this.methodCall()`。

例如：

```text
class Foo {
  field int x, y;

  method void twiddle() {
    let x = x + y;
    let y = y - 1;
    return;
  }
}
```

调用：

```text
do myFoo.twiddle();
do myOtherFoo.twiddle();
```

第一次调用里 `this == myFoo`，第二次调用里 `this == myOtherFoo`。

:::danger method
Jack method 本质是“自带隐藏参数 `this` 的 function”。调用 method 时，当前对象地址会作为隐藏的第 0 个参数传入。
:::

## 11.9. Constructors

Constructor 用来创建新 object。

运行时：

1. 在 heap 上分配一块内存。
2. `this` 指向这块内存。
3. 初始化 fields。
4. 最后 `return this;`。

例子：

```text
class Foo {
  field int x, y;

  constructor Foo newFoo(int a) {
    let x = 5;
    let y = a;
    return this;
  }
}

let myFoo = Foo.newFoo(42);
```

对象用完后，需要自己写 dispose method 调用：

```text
do Memory.deAlloc(this);
```

:::danger constructor
Constructor = `Memory.alloc(field_count)` + `pointer 0 = new object base` + 初始化 fields + `return this`。
:::

## 11.10. `[]` Syntax and Memory Access

所有 class type variables 本质上都是 pointer，也就是地址。

表达式：

```text
myObject[i]
```

含义：

```text
RAM[myObject + i]
```

所以：

1. Array 通过这个语法访问元素。
2. String 也可以看成 heap 上的一段 memory。
3. 对任意 class variable，也可以用 `obj[i]` 作为内存后门。

例子：

```text
var int x;
let x = 16384;
let x[0] = 0;    // writes RAM[0x4000] = 0
```

:::warning `[]`
Jack 的 `[]` 不只给数组用。它本质是 base address + offset，是数组、字符串、对象字段和底层 I/O 的基础。
:::

## 11.11. Multi-file Jack Compilation

规则：

1. 每个 `.jack` 文件只包含一个 class。
2. `Foo.jack` 必须定义 `class Foo { ... }`。
3. 所有代码都必须在某个 class 里。
4. 程序入口是 `Main.main()`。
5. 每个 `.jack` 单独编译为一个 `.vm`。
6. 最后 VM translator 把所有 `.vm` 合并成一个 assembly 程序。

Jack compiler 不做复杂链接。如果 `Main.jack` 用了 `Foo`，它假定最终会有 `Foo.vm`。

## 11.12. Compiling Jack: Pipeline

Jack compiler 前半段：

```text
Jack source
    ↓ lexing
tokens
    ↓ parsing
XML parse tree
    ↓ simplification
AST
    ↓ symbol table + recursive code generation
VM code
```

关键任务：

1. Lexing：把 source code 切成 tokens。
2. Grammar parsing：按 EBNF 解析合法结构。
3. Parse tree：生成 XML 语法树，便于调试。
4. AST：去掉多余符号，只保留有意义结构。
5. Symbol table：记录变量属于哪个 VM segment。
6. Code generation：递归输出 VM code。

## 11.13. Jack Lexing

Jack token types：

| Token type | Examples |
|---|---|
| Keywords | `class`、`constructor`、`function`、`method`、`field`、`static` |
| Type keywords | `int`、`char`、`boolean`、`void` |
| Statement keywords | `var`、`let`、`do`、`if`、`else`、`while`、`return` |
| Value keywords | `true`、`false`、`null`、`this` |
| Symbols | `{ } [ ] ( ) . , ; + - * / & | ~ < > =` |
| Integer literals | decimal `0..32767` |
| String literals | `"..."` without newline or internal quote |
| Identifiers | letters / digits / `_`, cannot start with digit, cannot be keyword |

Lexer 的任务：

```text
characters -> tokens
```

之后所有步骤都只处理 tokens，不再直接处理原始字符串。

## 11.14. Jack Grammar

Jack grammar 用 EBNF 描述。

EBNF 记号：

| Symbol | Meaning |
|---|---|
| `{ ... }` | repeat 0 or more times |
| `[ ... ]` | optional |
| `|` | or |

Class grammar：

```text
<class> ::= 'class' identifier '{'
            { <classVarDec> }
            { <subroutineDec> }
            '}'
```

Class variable declaration：

```text
<classVarDec> ::= ('static' | 'field')
                  <type> identifier
                  { ',' identifier }
                  ';'
```

Subroutine declaration：

```text
<subroutineDec> ::= ('constructor' | 'function' | 'method')
                    ('void' | <type>)
                    identifier
                    '(' <parameterList> ')'
                    <subroutineBody>
```

Subroutine body：

```text
<subroutineBody> ::= '{' { <varDec> } <statements> '}'
```

:::danger 声明顺序
Class 开头先声明 `static/field`；函数 body 开头先声明 `var`。这样 symbol table 很容易建立。
:::

## 11.15. Statements Grammar

Statements：

```text
<statements> ::= { <letStatement> | <ifStatement> | <whileStatement> |
                   <returnStatement> | <doStatement> }
```

Let：

```text
<letStatement> ::= 'let' identifier
                   [ '[' <expression> ']' ]
                   '=' <expression> ';'
```

If：

```text
<ifStatement> ::= 'if' '(' <expression> ')'
                  '{' <statements> '}'
                  [ 'else' '{' <statements> '}' ]
```

While：

```text
<whileStatement> ::= 'while' '(' <expression> ')'
                     '{' <statements> '}'
```

Do：

```text
<doStatement> ::= 'do' <subroutineCall> ';'
```

Return：

```text
<returnStatement> ::= 'return' [ <expression> ] ';'
```

Statement 可以递归嵌套，例如 `if` / `while` 内部又有 `<statements>`。

## 11.16. Expression Grammar

Expression：

```text
<expression> ::= <term>
                 { ('+' | '-' | '*' | '/' | '&' | '|' | '<' | '>' | '=')
                   <term> }
```

Term：

```text
<term> ::= integerLiteral | stringLiteral |
           'true' | 'false' | 'null' | 'this' |
           identifier [ '[' <expression> ']' ] |
           '(' <expression> ')' |
           (('-' | '~') <term>) |
           <subroutineCall>
```

Subroutine call：

```text
<subroutineCall> ::= identifier [ '.' identifier ]
                     '(' <expressionList> ')'
```

Expression list：

```text
<expressionList> ::= [ <expression> { ',' <expression> } ]
```

因为 expression / term 可以互相递归，所以能表示复杂嵌套表达式：

```text
Math.sqrt((x + y) * Main.fibonacci(z))
```

## 11.17. Parse Tree, XML, AST

Parse tree / syntax tree 用树表示语法结构。

课程使用 XML 存 parse tree，因为：

1. Human-readable，方便调试。
2. Standard format，容易读写。
3. 可以流式处理，不一定要一次加载整棵树。

例如：

```xml
<whileStatement>
  ...
</whileStatement>
```

Parser 可以先生成完整 XML，再用 `diff` 对比标准输出。

AST / Abstract Syntax Tree 是精简版树：

1. Parse tree 保留所有语法符号。
2. AST 删除多余 token，例如固定的 `if`、`{`、`}`、`(`、`)`。
3. Code generation 更关心条件、then branch、else branch 这些有意义结构。

:::warning Parse tree vs AST
Parse tree 是完整句法树；AST 是删掉多余语法符号后的语义结构，更适合生成代码。
:::

## 11.18. Recursive Descent Parser

课程 parser 可理解成 LL(2) recursive descent parser。

关键词：

1. `current`：当前 token。
2. `lookahead`：下一个 token。
3. `parse_xxx()`：每个 non-terminal 对应一个解析函数。

例如：

```text
parse_class()
parse_statements()
parse_whileStatement()
parse_term()
```

约定：

1. 进入 `parse_abc()` 时，`current` 指向 `<abc>` 的第一个 token。
2. 函数负责输出 `<abc>` 这棵 XML subtree。
3. 返回时，`current` 指向 `<abc>` 后面的下一个 token。

唯一常见需要 lookahead 的地方：`term` 以 identifier 开头时，要判断它是：

1. 普通变量。
2. Array indexing：后面是 `[`。
3. Subroutine call：后面是 `.` 或 `(`。

## 11.19. Symbol Tables and VM Segments

Jack 语义简单，不需要复杂独立 semantic analysis。核心是把变量名映射到 VM segment + index。

变量到 VM 段：

| Jack variable kind | VM segment |
|---|---|
| `var` local variable | `local` |
| function parameter | `argument` |
| `static` | `static` |
| `field` | `this` |

Compiler 通常维护两张表：

| Symbol table | Contains |
|---|---|
| Class symbol table | `field` 和 `static` |
| Subroutine symbol table | `argument` 和 `local` |

进入一个 subroutine 时：

1. 创建新的 subroutine symbol table。
2. 如果是 method，自动插入 `this`，kind=`argument`，index=`0`。
3. 把 parameter list 加进去，kind=`argument`。
4. 把 body 开头的 `varDec` 加进去，kind=`local`。
5. 编译 statements 时，遇到变量名就查表，得到 segment 和 index。
6. subroutine 结束时销毁这张表。

:::danger 符号表
符号表告诉 compiler：一个名字到底是 argument、local、static 还是 field，并映射到 VM 的 `argument/local/static/this` 段。
:::

## 11.20. Recursive VM Code Generation

Code generation 可以沿用 parser 的递归结构。

### 11.20.1 `compile_while`

`while` grammar：

```text
while (expression) { statements }
```

生成思路：

1. 生成唯一标签：`WHILE_START_4`、`WHILE_END_4`。
2. 输出 `label WHILE_START_4`。
3. 编译 condition expression，让结果留在栈顶。
4. 输出 `not` 和 `if-goto WHILE_END_4`，条件为假就跳出。
5. 编译 loop body statements。
6. 输出 `goto WHILE_START_4`。
7. 输出 `label WHILE_END_4`。

### 11.20.2 `compile_expression`

Expression grammar：

```text
<expression> ::= <term> { op <term> }
```

生成策略：

1. 先 `compile_term()`，把第一个 term 的值压栈。
2. 如果还有 `op + term`，记录 op。
3. 编译下一个 term，把第二个值压栈。
4. 根据 op 输出 VM 指令。

常见映射：

| Jack op | VM output |
|---|---|
| `+` | `add` |
| `-` | `sub` |
| `*` | `call Math.multiply 2` |
| `/` | `call Math.divide 2` |
| `=` | `eq` |
| `<` | `lt` |
| `>` | `gt` |
| `&` | `and` |
| `|` | `or` |

没有 operator precedence，所以从左到右生成代码不会和语言规则冲突。

## 11.21. Object Layout

Jack object 在内存里是 pointer-based array。

如果：

```text
class Foo {
  field int x;
  field int y;
  field int z;
}

var Foo myFoo;
```

那么 `myFoo` 存的是对象地址，不是整个对象。

字段布局：

```text
myFoo.x -> RAM[myFoo + 0]
myFoo.y -> RAM[myFoo + 1]
myFoo.z -> RAM[myFoo + 2]
```

所以：

```text
myFoo[2]
```

等价于访问 `z` 的位置。

对象放在 heap 上；保存对象地址的变量本身通常在 stack 上。

## 11.22. Compiling Subroutines

Jack 里三种 subroutine：

1. `function`
2. `method`
3. `constructor`

共同规则：

1. 调用前先编译每个 argument expression，把值 push 到栈上。
2. 生成 `call ClassName.subroutineName n`。
3. 所有 subroutine return 前都必须让栈顶有一个返回值。
4. `void` subroutine 也要 `push constant 0` 再 `return`。
5. `do` 调用后要 `pop temp 0` 丢弃返回值。

### 11.22.1 Function

Function 跟对象无关，是普通工具函数。

它可以访问 class 的 `static` variables，但没有当前 object。

### 11.22.2 Constructor

Constructor 负责创建 object：

1. 计算 field count。
2. 调用 `Memory.alloc(field_count)`。
3. 把返回地址设为当前 `this`：

```text
push constant field_count
call Memory.alloc 1
pop pointer 0
```

4. 初始化 fields。
5. `return this`。

如果 constructor 不返回新对象地址，就会造成 heap memory leak。

### 11.22.3 Method

Method 绑定到某个 object。

编译 method call：

1. 先把当前对象地址 push 到栈上，作为隐藏的第 0 个参数。
2. 再 push 用户写的参数。
3. `call` 时参数个数 `+1`。

如果写：

```text
do obj.method(a, b);
```

编译时实际类似：

```text
push obj
push a
push b
call ClassName.method 3
```

Method body 开始时要设置 `this`：

```text
push argument 0
pop pointer 0
```

这样 `this 0`、`this 1` 就自然对应当前对象的 fields。

:::danger method / constructor
Method：隐藏参数 `this`，函数开头 `pointer 0 = argument 0`。Constructor：`Memory.alloc(field_count)`，然后 `pointer 0 = new object base`。
:::

## 11.23. Compiling Terms

编译 term 的目标：不管 term 是什么，最后都让它的值在 VM stack top。

常见情况：

| Jack term | VM idea |
|---|---|
| integer constant | `push constant k` |
| `(expr)` | recursively compile expression |
| argument variable | `push argument i` |
| local variable | `push local i` |
| static variable | `push static i` |
| field variable | `push this i` |
| subroutine call | compile call, return value ends on stack |
| array access | compute address, use `that 0` |
| string literal | construct String object on heap |

如果同一个名字同时出现在 class symbol table 和 subroutine symbol table，优先使用 subroutine symbol table，也就是内层作用域覆盖外层。

## 11.24. String Literals and Memory Leaks

官方 Jack 编译字符串字面量的方式：

1. 创建一个新的 `String` object。
2. 长度作为参数调用 `String.new`。
3. 对每个字符调用 `String.appendChar`。
4. 最后把 String object 的地址留在栈顶。

例如 `"hello"`：

```text
push constant 5
call String.new 1
push constant 104
call String.appendChar 2
...
```

问题：

```text
while (true) {
  do Output.printString("Uh-oh!");
}
```

每次循环都会在 heap 上新建一个 String object，但没有释放，导致 memory leak。

这不是实现 bug，而是语言设计选择。自动复用或自动释放字符串会改变语义，甚至破坏旧程序。

C 里也有类似问题：

```c
char myString[] = "Hello";
```

在 stack 上复制字符串，函数返回后可能 dangling pointer。

```c
char *myString = "Hello";
```

指向静态只读区，生命周期长但不能随便修改。

:::warning 字符串
字符串字面量暴露了语言设计里的内存管理难题：自动释放、复用、可变性、生命周期都没有免费答案。
:::

## 11.25. What This Course Built

从 Jack 到 VM：

1. 把 Jack 这种 C-like language 编译成 stack machine VM instructions。
2. 用 grammar + recursion 把复杂表达式变成一串 stack operations。
3. 把 object 实现成 pointer + array。
4. 在 heap 上分配和释放内存。
5. 用 symbol table 管理不同作用域变量。
6. 把 `while`、`if` 编译成 labels 和 goto。

从 VM 到 assembly：

1. 把 stack machine instructions 翻译成 Hack assembly。
2. 用 assembly 实现 stack push / pop。
3. 用 stack 实现 call / return。
4. 把 virtual memory segments 映射到 physical RAM。
5. 支持多 VM 文件合并，形成 library + main program 结构。

从 assembly 到 machine code：

1. 把 Hack assembly 翻译成 binary machine code。
2. 把 labels 变成 ROM addresses。
3. 把 variables 从 RAM[16] 开始分配。
4. 用 memory-mapped I/O 控制 screen 和 keyboard。

从 NAND 到 computer：

```text
NAND -> latch -> flip-flop -> registers / memory -> ALU -> CPU -> whole machine
```

## 11.26. Future Directions

课程没有深入实现但已经能理解的方向：

1. 用 Verilog 等 HDL 设计更复杂电路。
2. 学更真实的 ISA，例如 MIPS / ARM。
3. 实现 interrupts、pipeline、cache。
4. 做真正支持多进程的 OS。
5. 写更强 compiler：type checking、verification、optimisation。
6. 支持更完整的 OOP、concurrency、threads、functional features。
7. 加网络接口，让 Hack computer 连接互联网。

:::tip 后续方向
编译器和语言相关可以继续看 programming languages；硬件和 OS 可以继续看 systems、cybersecurity 或 HPC。
:::

## 11.27. Exam Review

这一章适合按这些问题复习：

1. Jack 为什么要简化 C-like syntax？
2. `var`、`let`、`do`、`return` 的规则是什么？
3. 为什么 local variables 必须在函数开头声明？
4. Jack 为什么没有 operator precedence？
5. `field` 和 `static` 的区别是什么？
6. Method 为什么有隐藏参数 `this`？
7. Constructor 如何用 `Memory.alloc` 创建 object？
8. `obj[i]` 的底层含义是什么？
9. Jack compiler pipeline 是什么？
10. Jack token types 有哪些？
11. Parse tree 和 AST 的区别是什么？
12. Recursive descent parser 如何工作？
13. Symbol table 如何把变量映射到 VM segments？
14. `compile_while` 和 `compile_expression` 如何生成 VM？
15. Object 在 heap 里的布局是什么？
16. `do` statement 为什么要丢弃返回值？
17. 字符串字面量为什么可能造成 memory leak？

:::danger 高频考点
重点背：Jack 语法限制、无运算符优先级、class/field/static/method/constructor、hidden `this` argument、object layout、compiler pipeline、token types、EBNF、parse tree vs AST、symbol table 到 VM segment 的映射、string literal 的 heap allocation。
:::
