# 10. Function Calls and Memory Management

这一章讲两条主线：

1. **Function call system**：用 stack / stack frame 实现 `function`、`call`、`return`。
2. **Memory management**：区分 stack allocation 和 heap allocation，并理解 `malloc` / `free` 的基本算法。

核心目标：让 Hack VM 支持高级语言真正需要的函数调用、递归、多文件编译、标准库和动态内存分配。

:::danger 重点
函数调用的本质是：调用时保存旧状态并建立新栈帧；返回时恢复旧状态，把返回值放回调用者栈上。堆内存的本质是：运行时从一片空闲内存里分配和回收不随函数返回自动消失的数据。
:::

## 10.1. Extending Hack VM

上一章的 Hack VM 已经有 stack、push/pop、算术逻辑、分支和虚拟内存段。这一章继续扩展 VM，让它能支撑：

1. 函数调用：`function` / `call` / `return`。
2. 正确的编译期内存分配：知道变量该放在哪个 segment。
3. 多文件编译：把一个文件夹里的多个 `.vm` 文件翻译成一个 `.asm`。
4. 标准库 / 操作系统：例如 `Sys.vm`、`Memory.vm`、`Math.vm`。
5. 运行时内存分配：类似 C 的 `malloc` / `free`。

两类内存：

| Memory | Lifetime | Controlled by |
|---|---|---|
| Stack | 跟函数调用生命周期绑定 | `SP` / `LCL` / `ARG` |
| Heap | 运行时动态分配，函数返回后仍可存在 | `alloc` / `deAlloc` |

## 10.2. Expected Function Behaviour

以递归 Fibonacci 为例：

```text
F0 = 0
F1 = 1
Fn = F(n-1) + F(n-2)
```

一个函数可能有：

1. Parameters：例如 `int n`。
2. Local variables：例如 `int x, y`。
3. Static variables：例如 `static int times_called`。

调用函数时应该发生：

1. 控制流跳到函数开头。
2. 参数变量设置成本次调用传入的值。
3. 局部变量重新分配，不继承上一次调用的值。
4. 静态变量保持之前的值，只在显式修改时改变。

函数返回时应该发生：

1. 控制流回到调用点的下一条指令。
2. 调用者原来的 locals / arguments 恢复。
3. 返回值出现在调用者能继续使用的位置。
4. 静态变量不因为 call / return 自动改变。

:::danger 递归
这些行为必须对任意层数的嵌套调用和递归成立，所以需要 call stack 保存每一层被暂时放到一边的旧状态。
:::

## 10.3. Multi-file VM Translation

当 VM translator 的输入是一个 folder，而不是单个 `.vm` 文件时：

1. 文件夹里的所有 `.vm` 文件都翻译成同一个 `.asm` 文件。
2. 所有 VM code 都应该写在函数里。
3. 生成的 assembly 程序开头要把 `SP` 设置为 `256`。
4. 程序入口是 `call Sys.init 0`。
5. `Sys.vm` 通常由测试代码或标准库提供。

初始化：

```text
SP = 256
call Sys.init 0
```

`Sys.init` 类似 C 语言里的 `main`，负责启动整个程序。

### 10.3.1 Function names

为了避免多文件函数重名，函数名使用：

```text
FileName.functionName
```

例如：

```text
abc.vm -> abc.print
abc.vm -> abc.crash
```

Jack 编译器也遵守这个规则：

```text
abc.jack 中的函数 xyz -> abc.xyz
```

### 10.3.2 `static` and `label` uniqueness

不同文件里的相同 static index 或 label name 不能冲突。

常见做法：

1. `static 3` 翻译成 assembly symbol：`FileName.3`。
2. `label LOOP` 翻译成 assembly label：`FileName$LOOP`。

:::danger 多文件编译
文件夹模式下：所有 `.vm` 合并成一个 `.asm`；入口固定是 `Sys.init`；函数名、static、label 都必须带文件级前缀避免冲突。
:::

## 10.4. Jack Standard Library

Jack 的“操作系统”其实是一组标准库，最终也会编译成 VM code。

常见库：

| Library | Purpose |
|---|---|
| `Sys.vm` | `Sys.init`、halt、crash、sleep |
| `Memory.vm` | memory allocation / deallocation |
| `Array.vm` | array support |
| `String.vm` | string support |
| `Keyboard.vm` | keyboard I/O |
| `Screen.vm` | screen I/O |
| `Output.vm` | text output |
| `Math.vm` | multiplication、division、min/max、sqrt |

具体实现细节不是重点，重点是理解：高级语言功能可以通过 VM 标准库提供。

## 10.5. Bootstrapping

**Bootstrapping**：用语言 A 写一个能编译语言 A 的 compiler。

这不是作弊，而是业界标准做法。典型流程：

1. 先写一个临时的、能用但很粗糙的 compiler A。
2. 这个 compiler A 可以用更低级语言、Hack VM、Hack assembly，或别的平台上的 C 写。
3. 再用 Jack 自己写一个更好的 compiler B。
4. 用 compiler A 编译 “Jack 写的 B”。
5. 再用 compiler B 编译自己。
6. 之后就可以丢掉 A，只维护 B。

:::warning Bootstrapping
核心思想：先用低级手段造一个能工作的工具，再用新语言重写更好的工具，最后让新工具编译自己。
:::

## 10.6. Functions in General

函数调用底层要解决四个目标。

### 10.6.1 Program flow

- 函数调用时：跳到函数开头执行
- 函数返回时：回到调用点的下一条指令继续执行

所以必须保存 **return address** / 返回地址。

### 10.6.2 Memory allocation

- 函数调用时，要为新函数的 arguments 和 locals 分配内存。
- 函数返回时，这些临时内存要释放，之后可以被其他调用重用。

### 10.6.3 Program state

调用新函数前，调用者的状态不能丢：

1. old `LCL`
2. old `ARG`
3. old `THIS`
4. old `THAT`
5. return address

返回时要恢复这些状态。

### 10.6.4 Static variables

Static variables 不属于某一次函数调用，而是在所有调用之间共享。

函数 call / return 不会自动重置 static variables。

## 10.7. Return Address and Call Stack

考虑：

```c
main() {
  // A
  foo();   // B
  // C
}
```

执行到 `foo()` 时，程序要跳到 `foo`。但 `foo` 结束后，必须回到 `B` 后面的 `C`。这个位置就是 **return address**。

在 assembly 里，return address 通常用 label 表示：

```asm
@RETURN_POINT
// push address
@foo
0;JMP
(RETURN_POINT)
```

多层调用时，return address 必须按顺序存起来：

```text
main -> foo -> bar -> baz
```

栈里可能是：

```text
栈底
├─ RET0   main 调完 foo 要回来的地方
├─ RET1   foo 调完 bar 要回来的地方
└─ RET2   bar 调完 baz 要回来的地方
栈顶
```

`baz` 返回时，只需要弹出栈顶：

```text
pop RET2
goto RET2
```

然后 `bar` 返回时弹 `RET1`，`foo` 返回时弹 `RET0`。

:::danger Call stack
栈天然适合函数调用，因为最后调用的函数最先返回，完全符合 LIFO。
:::

## 10.8. Stack Allocation

函数调用时，编译器知道：

1. 有多少 arguments。
2. 有多少 local variables。
3. 每个变量占几个 word。
4. 总共需要多少 stack slots。

编译器内部可以有 symbol table：

| Name | Type | Kind | Offset |
|---|---|---|---:|
| `x` | `int` | `local` | 0 |
| `y` | `int` | `local` | 1 |
| `z` | `int` | `local` | 2 |
| `a` | `int` | `argument` | 0 |

每次调用函数时，就在 stack 上留出一块空间。这块空间叫：

```text
stack frame / call frame
```

它跟函数调用生命周期绑定：函数返回时自动废弃。

:::warning Stack vs heap
Stack allocation 适合函数自己的临时变量。Heap allocation 适合函数返回后仍要继续存在的数据，例如动态数组、对象等。
:::

## 10.9. Hack VM Function Syntax

Hack VM 专门设计了 `function` / `call` / `return`，让 VM translator 不需要像 C compiler 那样重新扫描整段函数来统计变量。

### 10.9.1 `function name x`

定义函数：

```text
function name x
```

含义：

1. `name` 是函数名，例如 `Main.main`、`Sys.init`、`sum.sum`。
2. `x` 是 local segment 的大小。

例如：

```text
如果用 local 0..7，则 x = 8
如果用 local 0..3，则 x = 4
如果用 local 0..4，则 x = 5
```

:::danger function x
`x` 写在 `function` 这一行，直接告诉 translator 要给这个函数分配多少 local slots。
:::

### 10.9.2 `call name x`

调用函数：

```text
call name x
```

含义：

1. `name` 是被调用函数。
2. `x` 是 argument 个数。
3. 这 `x` 个参数已经在栈顶。
4. 返回后，参数位置会被返回值替代。

从调用者视角：

```text
arguments disappear
return value appears on stack
```

### 10.9.3 `return`

函数返回：

```text
return
```

含义：

1. 把当前栈顶值当作返回值。
2. 控制权交还给调用者。
3. 调用者栈上出现这个返回值。

## 10.10. Example: `sum(n)`

目标：写一个 `sum(n)`，计算：

```text
1 + 2 + ... + n
```

调用端伪 VM：

```text
push constant 30
call sum.sum 1
pop temp 0

label INF_LOOP
goto INF_LOOP
```

函数思路：

```text
function sum(n):
  result = 1
  i = 2
  while (i <= n):
    result = result + i
    i = i + 1
  return result
```

VM 设计：

1. `argument 0` 存 `n`。
2. `local 0` 存 `i`。
3. 栈顶可以保存当前 `result`。
4. 用 `label LOOP_START` / `label LOOP_END` 控制循环。
5. 用 `gt` / `if-goto` 实现退出条件。

## 10.11. Implementing `call`

当 translator 看到：

```text
call myFunc 2
```

它要生成 assembly 完成以下动作。

### 10.11.1 Push return address

生成唯一 return label，例如：

```text
auto$57
```

把这个地址压栈，之后 `return` 会跳回这里。

### 10.11.2 Save old segment bases

依次把当前调用者的段指针压栈：

```text
push LCL
push ARG
push THIS
push THAT
```

这四个旧值加上 return address 构成 call frame 的保存区。

### 10.11.3 Set `ARG`

假设 `call myFunc 2`，两个参数已经在栈顶附近。

设置：

```text
ARG = SP - 2
```

`ARG` 指向 `argument 0`。

### 10.11.4 Set `LCL`

新函数的 local segment 从当前栈顶往上长：

```text
LCL = SP
```

之后 `function` 会根据 local 数量扩展 stack。

### 10.11.5 Jump to function

跳到函数入口：

```asm
@myFunc
0;JMP
```

:::danger call 协议
`call` 要做五件事：push return address、保存 LCL/ARG/THIS/THAT、设置 ARG、设置 LCL、跳到函数入口。
:::

## 10.12. Implementing `function`

当 translator 看到：

```text
function myFunc 3
```

它要生成：

1. 函数入口 label：`(myFunc)`。
2. 扩展栈给 locals：`SP = LCL + 3`。
3. 把 `local 0..2` 初始化为 `0`。
4. 继续执行函数体 VM code。

Hack VM 规范要求 local variables 初始值为 0，避免新函数看到旧栈帧留下的脏数据。

:::warning function 初始化
`function name x` 不只是声明 label，还要分配 `x` 个 local slots，并全部置 0。
:::

## 10.13. Implementing `return`

`return` 需要生成一段通用模板，恢复调用者状态并跳回 return address。

当前栈帧大致结构：

```text
argument 0
argument 1
return address
old LCL
old ARG
old THIS
old THAT
local 0
local 1
local 2
...
return value   ← stack top
```

返回步骤：

1. 暂存 return address，例如放入 `R13`。
2. 把栈顶返回值放到调用者的 `ARG[0]`：

```text
*ARG = pop()
```

3. 设置调用者的新栈顶：

```text
SP = ARG + 1
```

4. 恢复旧段指针：

```text
THAT = *(LCL - 1)
THIS = *(LCL - 2)
ARG  = *(LCL - 3)
LCL  = *(LCL - 4)
```

5. 跳回 return address。

```text
goto return_address
```

栈高于 `SP` 的部分都被视为废弃，也就是这一层 stack frame 被释放。

:::danger return 模板
`return` 的模板不需要知道当前函数是谁、调用者是谁。只要所有函数都遵守 call/function/return 协议，这套恢复流程对所有函数通用。
:::

## 10.14. Sys.init and Main.main

多文件 VM 程序入口永远是：

```text
call Sys.init 0
```

在这之前，`LCL` / `ARG` 里是什么垃圾值不重要。执行 `call Sys.init 0` 后，call 协议会正确设置新的 `ARG` / `LCL`。

官方 `Sys.init` 通常会：

1. 调用各个库初始化函数，例如 `Memory.init`、`Output.init`、`Screen.init`。
2. 调用 `Main.main`，也就是 Jack 程序的主函数。
3. 最后进入无限循环，不再返回。

## 10.15. Heap Memory Allocation

Heap allocation 目标：实现类似 C 的 `malloc` / `free`。

在 Jack 里对应：

```text
Memory.alloc
Memory.deAlloc
```

要实现两个函数：

| Function | Meaning |
|---|---|
| `alloc(size)` | 找一段至少 `size` 长的空闲内存，返回 base；找不到返回 `-1` |
| `deAlloc(base)` | 把从 `base` 开始的段标记为空闲，以后可重用 |

堆内存相关概念：

| Term | Meaning |
|---|---|
| heap memory | 运行时动态分配的内存区域 |
| allocated segment | 已经被 `alloc` 返回给程序使用的段 |
| free segment | 当前未使用、以后可以分配的段 |
| fragmentation | 总空闲很多，但被切成小块，导致大块申请失败 |
| coalescing | 合并相邻空闲段 |
| linked list | 用指针把 free segments 串起来 |

接口不保证：

1. 你写到 `base - 1`。
2. 你写到 `base + size` 后面。
3. 你释放后继续访问这块内存。

这些都是程序员自己的错误。

## 10.16. `malloc` Attempt 1: Bump Pointer

最简单算法：只记录“第一个还没用过的地址”。

在 `RAM[0x800]` 存一个指针 `p`：

```text
p = first unused address
```

`alloc(size)`：

```text
return p
p = p + size
```

`deAlloc(base)`：

```text
do nothing
```

优点：

1. 实现非常简单。
2. `alloc` 是 `O(1)`。

缺点：

1. 只涨不回。
2. `deAlloc` 完全没用。
3. 本质是 giant memory leak。

:::warning Attempt 1
这是“指针只往前走”的 bump allocator。适合解释概念，不适合真实长期运行的系统。
:::

## 10.17. `malloc` Attempt 2: Free List

Attempt 2 用 free list 管理空闲段，把元数据直接写在 segment 里。

为什么不单独开一张表？

因为空闲段数量也是运行时才知道的，单独表本身也需要动态内存，会陷入递归。所以把元数据放进空闲段自身。

Segment layout：

| Word | Meaning |
|---|---|
| word 0 | usable size |
| word 1 | next free segment pointer，只有 free segment 需要 |

`RAM[0x800]` 存 free list head。

### 10.17.1 `alloc(size)`

流程：

1. 从 free list head 开始遍历。
2. 找到一个 usable size >= `size` 的 free segment。
3. 把它从 free list 摘除。
4. 如果它比 `size` 大，就拆成 allocated segment + new free segment。
5. 返回用户可用区域的 base。

### 10.17.2 `deAlloc(base)`

流程：

1. 用户传入 `alloc` 返回的 base。
2. `base - 1` 位置存着该段大小。
3. 把这段视为新的 free segment。
4. 插入 free list 表头。

优点：

1. 可以重复利用释放掉的空间。
2. 只用一个 linked list 管理所有 free segments。

缺点：

1. 不合并相邻空闲段。
2. 非常容易 fragmentation。

:::danger Fragmentation
Attempt 2 总空闲空间可能很大，但被切成很多小块。申请一个大块时仍然可能失败。
:::

## 10.18. `malloc` Attempt 3: Coalescing

Attempt 3 的目标：`deAlloc` 时如果前后邻居也是 free，就合并成更大的 free segment。

问题：free list 不一定按地址排序，直接找邻居很慢。

解决：给 segment 更多 metadata，让系统能沿物理地址顺序移动，并能快速从 free list 删除任意节点。

Segment layout：

| Metadata | Meaning |
|---|---|
| first word | usable size |
| second word | status: Free / Used |
| last word | usable size again |
| free word 3 | prev pointer |
| free word 4 | next pointer |

Free segments 用 doubly-linked list 管理。

### 10.18.1 `alloc(size)`

基本类似 Attempt 2：

1. 在 free list 中找足够大的段。
2. 如果太大就拆分。
3. 把选中段 status 改成 Used。

### 10.18.2 `deAlloc(base)`

核心流程：

1. 找到当前段头，设为 Free。
2. 检查前一个物理相邻段。
3. 如果前一个段 Free，就合并。
4. 检查后一个物理相邻段。
5. 如果后一个段 Free，就从 free list 删除后段并合并。
6. 更新 size metadata。
7. 把合并后的段插入 free list。

效果：

1. 大块连续释放时可以合并回大段。
2. 比 Attempt 2 明显减少碎片。
3. 但不同大小的 alloc / deAlloc 混杂时，仍可能产生碎片。

:::danger Coalescing
Coalescing 是解决 fragmentation 的核心技巧：释放时主动合并相邻 free segments。
:::

## 10.19. Fragmentation and Fit Strategies

**Fragmentation**：内存被切成很多不规则小碎片，总空闲足够，但没有一块足够大。

一种解决方式是 defragmentation：

1. 按地址排序。
2. 搬移数据。
3. 合并出连续大空闲段。

但不能在 `alloc` / `deAlloc` 中自动整理，因为用户手里拿着裸指针。如果系统偷偷移动内存，外部指针全部失效。

对比：

| Strategy | Meaning | Pro | Con |
|---|---|---|---|
| First-fit | 找到第一个够大的 free block 就用 | 快 | 容易碎片化 |
| Best-fit | 扫描全部 free blocks，找最接近 size 的 | 更少碎片 | 慢 |

## 10.20. `malloc` Attempt 4: Bins

Attempt 4 用 bins 加速查找。

核心想法：不是所有 free segments 都放进同一条链表，而是按大小范围分桶。

例如：

```text
RAM[0x800] -> size <= 0x1C 的 free list
RAM[0x801] -> size 0x1D..0x38 的 free list
...
RAM[0x809] -> size 0x1C01..0x3800 的 free list
```

`alloc(size)`：

1. 先算 `size` 应该落在哪个 bin。
2. 从对应 bin 的 free list 开始找 first-fit。
3. 如果找不到，就去下一个更大的 bin。
4. 找到后仍然按 Attempt 3 的方式拆分和标记。

`deAlloc(base)`：

1. 先做 coalescing。
2. 合并后根据新 size 决定放进哪个 bin。
3. 如果大小变化，要从旧 bin 移除并插入新 bin。

效果：

1. 不用扫描所有 free segments。
2. 更接近 best-fit。
3. 比纯 best-fit 快。

高级做法：每个 bin 内部还可以用 balanced search tree，例如 2-3-4 tree，让查找更快。

:::warning Bins
Bins 的思想是“按大小分类管理空闲段”：查找更快，同时尽量减少碎片。
:::

## Exam Review

这一章适合按这些问题复习：

1. 函数调用为什么需要 return address？
2. 为什么 call stack 适合嵌套调用和递归？
3. `function name x` 中 `x` 是什么？
4. `call name x` 中 `x` 是什么？
5. `call` 的底层步骤有哪些？
6. `function` 如何分配并初始化 locals？
7. `return` 如何恢复调用者状态？
8. `SP = ARG + 1` 的意义是什么？
9. 多文件 VM 程序为什么从 `Sys.init` 开始？
10. Stack allocation 和 heap allocation 的区别是什么？
11. `alloc(size)` / `deAlloc(base)` 分别做什么？
12. Attempt 1、2、3、4 的核心思想和缺点分别是什么？
13. 什么是 fragmentation？coalescing 如何缓解？
14. First-fit 和 best-fit 的区别是什么？

:::danger 高频考点
重点背：call/function/return 三个命令语义、call frame 保存哪些值、return 恢复顺序、`function x` 和 `call x` 的区别、`Sys.init`、stack vs heap、malloc 四种 attempt、fragmentation、coalescing、bins。
:::
