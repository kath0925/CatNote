# 08. Compiler concepts

Compiler concepts / 编译器概念：这一章讲 Hack assembler 如何把 `.asm` 文本变成 `.hack` 的 16-bit 机器码。

核心流程可以理解成四件事：

1. **Lexing**：把源代码字符串切成 token。
2. **Symbol Table Construction**：处理 label 和 variable 的地址。
3. **Parsing**：判断 token 序列是不是合法指令，并拆成 A-instruction / C-instruction。
4. **Code Generation**：把解析后的结构翻译成 16-bit machine code。

:::danger 重点
这一章其实是在讲一个小型 compiler / assembler pipeline：字符 → token → 语法结构 → 地址解析 → 机器码。
:::

## 8.1. Overview: from `.asm` to `.hack`

Assembler 的任务：把 Hack assembly 源代码翻译成 Hack CPU 能执行的 16-bit binary code。

```text
.asm source code
    ↓ lexing
tokens
    ↓ parsing
A-instruction / C-instruction structure
    ↓ symbol table replacement
numeric addresses
    ↓ code generation
.hack 16-bit machine code
```

Hack assembler 必须解决两个问题：

1. **语法问题**：这一行到底是 `@value`、`dest=comp;jump`，还是 `(LABEL)`？
2. **地址问题**：`@xxx` 里的 `xxx` 到底是数字、变量 RAM 地址，还是 label ROM 地址？

## 8.2. Lexing

**Lexing / 词法分析**：把源代码字符串切割成一个个最小的词，叫做 **token**。

例如：

```asm
D;JGT   // if D > 0 goto output first
```

Lexing 后得到：

```text
Token 1: Keyword(D)
Token 2: Symbol(;)
Token 3: Keyword(JGT)
Token 4: Newline
```

注释和空白会被丢掉，assembler 后续只处理结构化 token。

:::warning 为什么要 lexing？
C 里直接处理字符串很麻烦。把源代码切成 `Token { type; value; }` 后，后面的 parser 不需要反复做复杂字符串比较。
:::

## 8.3. Hack Assembly Token Types

Hack assembly 主要有 5 类 token。

### 8.3.1 Keywords

**Keywords** / 关键字：Hack 语言预定义的固定单词。

常见 keywords：

1. Registers：`A`、`D`、`M`
2. Jump keywords：`JGT`、`JEQ`、`JLT`、`JGE`、`JNE`、`JLE`、`JMP`
3. Memory keywords：`SCREEN`、`KBD`
4. Predefined registers：`R0` 到 `R15`

:::danger 注意
关键字不能当作变量名。例如不能把变量命名成 `D`、`M`、`JMP` 或 `SCREEN`。
:::

### 8.3.2 Symbols

**Symbols** / 符号：标点符号和操作符。

```text
@ + - & | = ; !
```

注意：`(` 和 `)` 通常不作为普通 token 进入后续 token stream，因为 label 会在 symbol table 阶段单独处理。

### 8.3.3 Integer literals

**Integer literal** / 整数常量：`0` 到 `32767` 的十进制整数。

原因：Hack A-instruction 只有 15-bit operand，所以最大正整数是：

```text
2^15 - 1 = 32767
```

例如：

```asm
@15
@1000
```

### 8.3.4 Identifiers

**Identifier** / 标识符：不是 keyword、不含空白，并且以字母开头的名字。

例如：

```text
LOOP
counter
sum
END
var123
```

这些 identifier 可能是 variable，也可能是 label。Lexing 阶段不区分它们，后面要靠 parsing 和 symbol table 判断。

### 8.3.5 Newline

Hack assembler 必须保留 newline，因为每行是一条指令的边界。

例如：

```asm
A
D=M
```

如果丢掉换行，就可能错误理解成：

```asm
AD=M
```

:::danger Newline
C 可以忽略换行，但 Hack assembler 不能忽略换行。Newline 是 Hack assembly 的重要 token。
:::

## 8.4. What Is Not a Token

以下内容不会进入最终 token list：

1. Whitespace：空格
2. Tabs：制表符
3. Comments：从 `//` 到行尾
4. Labels：例如 `(LOOP)`，会在 symbol table 阶段处理

例子：

```asm
@counter   // load counter
D = M + 1
(LOOP)
0;JMP
```

Lexing 后：

```text
Symbol("@")
Identifier("counter")
Newline

Keyword("D")
Symbol("=")
Keyword("M")
Symbol("+")
IntegerLiteral("1")
Newline

IntegerLiteral("0")
Symbol(";")
Keyword("JMP")
Newline
```

`(LOOP)` 不产生普通 token，因为 label 不生成机器指令。

## 8.5. Symbol Tables

Assembler 必须知道：

1. `@LOOP` 里的 `LOOP` 指向哪条 ROM instruction？
2. `@counter` 里的 `counter` 在 RAM 的哪个地址？

所以 assembler 需要 symbol table。

| Table | Mapping | Meaning |
|---|---|---|
| Label Table | label → ROM address | label 对应程序指令行号 |
| Variable Table | variable → RAM address | variable 从 RAM[16] 开始分配 |

常见概念：

1. **Identifier**：代码里定义意义的名字，Hack 里主要是 `labels` / `variables` 。
2. **Symbol table**：`name → address` 的映射。
3. **Label table**：`label → ROM address`。
4. **Variable table**：`variable → RAM address`，从 16 开始。

Symbol table 至少要支持三种操作：

1. Add a new name and address：插入。
2. Check if a name is in the table：检查是否存在。
3. Retrieve the corresponding address：取出地址。

:::danger 符号表
`@xxx` 里的 `xxx` 可能是 number、label、variable。Assembler 判断它的唯一可靠方法就是查 symbol table。
:::

## 8.6. Two-Pass Assembly

Hack assembler 通常做 two-pass assembly（两遍扫描）。

### 8.6.1 Pass 1: labels

Pass 1 处理 labels。

目标：找到所有 `(LABEL)` 对应的 ROM address。

例子：

```asm
0   @input1
1   D=M
2   @input2
3   D=D-M
4   @output_first
5   D;JGT
6   @input2
7   D=M
8   @output_d
9   0;JMP
10  (output_first)
11  @input1
12  D=M
13  (output_d)
14  @output_val
15  M=D
16  (infinite_loop)
17  @infinite_loop
18  0;JMP
```

Pass 1 记录：

| Label | ROM address |
|---|---:|
| `output_first` | 10 |
| `output_d` | 12 |
| `infinite_loop` | 14 |

:::danger Label 不占 ROM 指令
`(LABEL)` 不会生成机器指令，所以它本身不计入 ROM instruction count。它只是给下一条真实机器指令起名字。
:::

### 8.6.2 Pass 2: variables

Pass 2 处理 variables。

规则：

1. 遇到 `@xxx`。
2. 如果 `xxx` 不在 Label Table。
3. 如果 `xxx` 也不在 Variable Table。
4. 那么 `xxx` 是新的 variable，分配下一个 RAM 地址，从 `16` 开始。

例如：

| Variable | RAM address |
|---|---:|
| `input1` | 16 |
| `input2` | 17 |
| `output_val` | 18 |

如果之后再次遇到 `@input1`，直接复用已有映射：

```text
input1 → RAM[16]
```

### 8.6.3 Replacement order

Assembler 必须做的地址处理顺序：

1. Allocate each variable a corresponding address in RAM, starting from 16。
2. Replace variables by their addresses。
3. Assign each label the address in ROM matching the machine code line of its declaration。
4. Replace labels by their addresses。
5. Only then replace `@` statements by A-instructions。

更简单地说：

```text
先确定 label 和 variable 的地址
再把 @xxx 替换成 @number
最后生成 A-instruction / C-instruction 机器码
```

:::danger 考点
地址没定之前，不要急着生成机器码。Label 是 ROM address；variable 是 RAM address；number 原样作为 A-instruction immediate value。
:::

## 8.7. Parsing

**Parsing** / 语法分析：把 token 转换成语法结构。

一句话区分：

```text
Lexing:   characters → tokens
Parsing:  tokens → syntax structure
```

例如：

```text
"D=M+1;JGT"
```

Lexing：

```text
["D", "=", "M", "+", "1", ";", "JGT"]
```

Parsing：

```text
C-instruction {
  dest = "D",
  comp = "M+1",
  jump = "JGT"
}
```

## 8.8. BNF and EBNF

**BNF** / Backus-Naur Form：用来严格描述合法语法的规则。

BNF 基本读法：

| Symbol | Meaning |
|---|---|
| `::=` | is defined as |
| `|` | or |
| `<...>` | non-terminal |
| quoted strings / tokens | terminal |

EBNF 扩展符号：

| Symbol | Meaning |
|---|---|
| `()` | grouping |
| `[]` | optional |
| `{}` | repetition |
| `A - B` | match A but not B |

Hack 的三种主要语法：

### 8.8.1 A-instruction

```text
<Ainstr> ::= '@' <value>
<value>  ::= <number> | <identifier>
```

例如：

```asm
@21
@counter
```

### 8.8.2 Label

```text
<label> ::= '(' <identifier> ')'
```

例如：

```asm
(LOOP)
```

Label 不生成 machine code，只更新 label table。

### 8.8.3 C-instruction

C-instruction 的结构：

```text
dest = comp ; jump
```

其中 `dest` 可选，`comp` 必须有，`jump` 可选。

BNF：

```text
<Cinstr> ::= [<dest> '='] <comp> [';' <jump>]
```

:::danger BNF
C-instruction 的 grammar 要会读：`dest` optional，`comp` mandatory，`jump` optional。
:::

## 8.9. CST and AST

**Concrete Syntax Tree (CST)** / 具体语法树：完整表示 token 如何匹配 grammar。

例如输入：

```asm
D=M+1;JGT
```

CST 大概是：

```text
Cinstr
├── dest = D
├── comp = M + 1
└── jump = JGT
```

但 CST 对 Hack assembler 来说太啰嗦，真正用于 code generation 的通常是 **AST** / Abstract Syntax Tree。

AST 可以简化成：

```text
Cinstr {
  dest = "D",
  comp = "M+1",
  jump = "JGT"
}
```

:::warning Parser generator
真实 compiler 的 parsing 很复杂，一般会用 yacc / bison、ANTLR、LLVM parser generator 等工具。Hack assembler 足够简单，可以手写 parser。
:::

## 8.10. Parsing C-instructions

假设 token 序列是：

```asm
D = M + 1 ; JGT
```

Parser 可以这样处理：

1. 遇到 `D`，先判断是否是 `dest`。
2. 遇到 `=`，说明 `dest` 部分结束。
3. 解析 `comp`：`M + 1`。
4. 遇到 `;`，说明 `comp` 部分结束。
5. 解析 `jump`：`JGT`。
6. 最终得到 `dest=D`、`comp=M+1`、`jump=JGT`。

Assembler 下一步才会把 `comp`、`dest`、`jump` 映射成 bits。

## 8.11. Code Generation

**Code Generation** / 代码生成：把 AST 转成 16-bit machine code。

### 8.11.1 A-instruction

A-instruction 格式：

```text
0 v15 v14 ... v1 v0
```

例如：

```asm
@21
```

机器码：

```text
0000000000010101
```

### 8.11.2 C-instruction

C-instruction 格式：

```text
111 a c1 c2 c3 c4 c5 c6 d1 d2 d3 j1 j2 j3
```

这 16 位分成四部分：

| Field | Bits | Meaning |
|---|---:|---|
| `111` | 3 | 标记这是 C-instruction |
| `a c1..c6` | 7 | `comp`，告诉 ALU 做什么 |
| `d1 d2 d3` | 3 | `dest`，告诉 CPU 写回哪里 |
| `j1 j2 j3` | 3 | `jump`，告诉 CPU 是否跳转 |

:::danger C 指令格式
`111 a c1c2c3c4c5c6 d1d2d3 j1j2j3` 必须熟。Code generation 本质就是查表并拼接这些 bit fields。
:::

## 8.12. `comp`, `dest`, `jump` Bit Mapping

### 8.12.1 `comp`

`comp` 是 7 bits：`a c1 c2 c3 c4 c5 c6`。

核心规律：

1. `a = 0` → 用 A register。
2. `a = 1` → 用 M，也就是 `RAM[A]`。

例如：

| comp | bits |
|---|---|
| `0` | `0 101010` |
| `1` | `0 111111` |
| `-1` | `0 111010` |
| `D` | `0 001100` |
| `A` | `0 110000` |
| `M` | `1 110000` |
| `D+1` | `0 011111` |
| `M-1` | `1 110010` |
| `D+M` | `1 000010` |
| `D-M` | `1 010011` |

规律：A 和 M 的同类表达式通常只有 `a` bit 不同。

### 8.12.2 `dest`

`dest` 是 3 bits，对应 `A`、`D`、`M`。

```text
d1 = A
d2 = D
d3 = M
```

例如 `dest = AD`：

```text
A ← 1
D ← 1
M ← 0
bits = 110
```

常见编码：

| dest | bits |
|---|---|
| `null` | `000` |
| `M` | `001` |
| `D` | `010` |
| `MD` | `011` |
| `A` | `100` |
| `AM` | `101` |
| `AD` | `110` |
| `AMD` | `111` |

### 8.12.3 `jump`

`jump` 是 3 bits，对应跳转条件：

| jump | bits |
|---|---|
| `null` | `000` |
| `JGT` | `001` |
| `JEQ` | `010` |
| `JGE` | `011` |
| `JLT` | `100` |
| `JNE` | `101` |
| `JLE` | `110` |
| `JMP` | `111` |

## 8.13. Full Translation Example

把这条 C-instruction 翻译成机器码：

```asm
D = M + 1
```

解析：

```text
dest = D
comp = M+1
jump = null
```

查表：

1. `M+1` 使用 M，所以 `a = 1`。
2. `M+1` 的 `comp` bits 是 `1 110111`。
3. `dest = D` → `010`。
4. `jump = null` → `000`。

拼接：

```text
111 1 110111 010 000
```

连续 bit：

```text
1111110111010000
```

:::danger 翻译步骤
翻译 C 指令时固定按这个顺序：先 parse 成 `dest/comp/jump`，再查 `comp`、`dest`、`jump` 表，最后拼成 `111 + comp + dest + jump`。
:::

## Exam Review

这一章适合按以下问题复习：

1. Lexing 是什么？Hack assembly 有哪 5 类 token？
2. 为什么 newline 在 Hack assembler 里必须保留？
3. Label 和 variable 的区别是什么？
4. 为什么 assembler 要做 two-pass assembly？
5. `@xxx` 中的 `xxx` 如何判断是 number、label 还是 variable？
6. BNF / EBNF 的基本符号怎么读？
7. C-instruction 的 BNF 为什么是 `[dest '='] comp [';' jump]`？
8. CST 和 AST 的区别是什么？
9. 如何把 `D=M+1` 翻译成 16-bit machine code？

:::danger 高频考点
重点背：token types、symbol table、two-pass assembly、label 不占 ROM 指令、variable 从 RAM[16] 开始、C-instruction BNF、`111 a cccccc ddd jjj` 机器码格式。
:::
