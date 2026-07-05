# 第五章 Python高级与正则表达式
## 5.1 迭代器Iterator

迭代器（iterator）是Python中的一种对象，用于在数据集合中逐个访问元素，而不需要暴露数据集合的底层实现。它提供了一种遍历集合元素的标准方式，适用于任何支持迭代的数据结构，如列表、元组等，`range()` 就是一个迭代器。

迭代器是一个实现了 `__iter__()` 和 `__next__()` 方法的对象，使得可以逐步遍历它的元素。

### 5.1.1 特点
1. 手动管理：需要显式地实现 `__iter__()` 和 `__next__()` 方法；
2. 状态管理：迭代器需要自己管理迭代状态，包括当前位置和结束条件；
3. 内存使用：内存使用取决于迭代器的实现，通常是惰性计算（即按需生成数据）；
4. 优势：支持惰性计算和高效的内存使用，适合处理大型数据集合或流数据。

### 5.1.2 迭代器底层实现
```python
for i in range(1, 6):       # range 属于可迭代类型
    print(i)
print('-' * 20)

# 场景2：自定义迭代器
# 1. 自定义迭代器类
class MyIterator:
    # 2. 通过init魔法方法，初始化属性，指定范围（开始和结束）
    def __init__(self, start, end):
        self.current_value = start  # 当前值，默认为开始值
        self.end = end              # 结束值

    # 3. 重写iterator魔法方法，返回当前对象（即，迭代器对象）
    def __iter__(self):
        return self

    # 4. 重写next魔法方法，返回当前值，并更新当前值
    def __next__(self):
        # 4.1 判断当前值范围是否合法
        if self.current_value >= self.end:
            raise StopIteration             # 抛出异常，停止迭代

        # # 4.2 否则，说明当前值合法，返回当前值，并更新
        # current = self.current_value        # current =      1 2 3 4 5
        # self.current_value += 1             # self.current = 2 3 4 5 6
        # return current                      # return value = 1 2 3 4 5

        # 4.3 效果同时，但代码更简单
        self.current_value += 1             # self.current =  2 3 4 5 6
        return self.current_value - 1       # value        =  1 2 3 4 5

# 5. 创建迭代对象，并遍历
# 5.1 for循环
for i in MyIterator(1, 6):
    print(i)
print('-' * 20)

# 5.2 next()函数
my_iterator = MyIterator(10, 13)
print(next(my_iterator))    # 10
print(next(my_iterator))    # 11
print(next(my_iterator))    # 12
```

## 5.2 生成器
根据程序员制定的规则循环生成数据，当条件不成立时则生成数据结束。数据不是一次性全部生成出来，而是使用一个，再生成一个，可以**节约大量的内存**。

### 5.2.1 创建生成器的方式
1. 生成器推导式（元组，列表，字典，集合）
```python
# 需求1：生成1-10之间的整数
import sys

my_generator = (i for i in range(1, 11))
print(my_generator)
print(type(my_generator))   # <class 'generator'>
print('-' * 20)

# 需求2：生成1-10之间的偶数
my_generator2 = (i for i in range(1, 11) if i % 2 == 0)
print(my_generator2)

# 需求3：如何从生成器中获取数据
# 思路1：next()
print(next(my_generator2))  # 2
print(next(my_generator2))  # 4
print('-' * 20)
for i in my_generator2:
    print(i)                # 6, 8, 10
print('-' * 20)

# 验证生成器的目的：减少内存占用
my_list = [i for i in range(10000000)]
my_generator3 = (i for i in range(10000000))
print(type(my_list), type(my_generator3))

# 查看my_list的内存空间
print(f'my_list的内存占用：{sys.getsizeof(my_list)}')             # 89095160
print(f'my_generator3的内存占用：{sys.getsizeof(my_generator3)}') # 200
print('-' * 20)
```

2. yield关键字：只要在def函数里面看到有yield关键字，就是生成器
```python
# 需求：通过yield方式获取到生成器 1-10 之间的整数
# 回顾：推导式写法
my_generator = (i for i in range(1, 11))

# yield方式如下
# 1. 定义函数，存储到生成器中，并返回
def my_func():
    # 原始写法：
    # my_list = []
    # for i in range(1, 11):
    #     my_list.append(i)
    # return my_list

    for i in range(1, 11):
        yield i             # yield作用：1.创建生成器对象；2.把值存储到生成器中；3.返回生成器

# 测试
my_generator2 = my_func()
print(type(my_generator2))  # <class 'generator'>

print(next(my_generator2))  # 1
print(next(my_generator2))  # 2
print('-' * 20)
for i in my_generator2:
    print(i)                # 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```
yield关键字的特性（作用）：
1. 将yield后面的值返回；
2. 在yield这个地方卡住（阻塞）。

### 5.2.2 生成器应用场景——数据迭代器dataloader的封装
- 很多模型都是一个批次一个批次给模型微数据，来训练模型的
- 构建数据生成器每8个条数据（8个样本）的给模型喂数据
```python
"""
案例：基于传入的数值（每批次的歌词条数），创建生成器，生成批次歌词。
"""
import math

# 需求：基于文件中周杰伦的歌词，创建生成器，根据传入的每批次的歌词条数，生成歌词批次。
# 1. 定义函数，接收每批次的歌词条数，返回生成器
def dataset_loader(batch_size):
    """
    自定义的歌词批量生成器
    :param batch_size: 每批次的歌词条数
    :return: 生成器，每个元素都是一批次的数据，例如：（8条，8条，8条……）
    """
    # 1.1 读取文件数据
    with open('./data/jaychou_lyrics.txt', 'r', encoding='utf-8') as src_f:
        # 1.2 一次读取所有行
        # lines = [line.strip() for line in src_f.readlines()]
        lines = src_f.readlines()

        # 1.3 计算批次总数，假设：5批
        total_batch = math.ceil(len(lines) / batch_size)

        # 1.4 通过for循环方式获取每批次的数据，放到生成器中，并返回。
        for idx in range(total_batch):
            # 第1批歌词数据，批次索引idx=0，歌词为：第1-8条，  索引为： 0-7
            # 第2批歌词数据，批次索引idx=1，歌词为：第9-16条， 索引为： 8-15
            # 第3批歌词数据，批次索引idx=2，歌词为：第17-24条，索引为：16-23
            yield lines[idx * batch_size : idx * batch_size + batch_size]

# 2. test
dl = dataset_loader(8)
print(next(dl))
print(next(dl))

for batch_data in dl:
    print(batch_data)

```
总结：`next`函数获取生成器的下一个值，`for`循环遍历生成器中的每一个值。

## 5.3 生成器和迭代器的区别
实现方式：
* 迭代器：需要实现 `__iter__()` 和 `__next__()` 方法，手动管理迭代状态
* 生成器：通过yield关键字简化实现，自动管理迭代状态

代码复杂度
* 迭代器：通常需要更多的代码来管理状态和迭代逻辑
* 生成器：代码更简洁，更容易理解和维护

性能与内存
* 迭代器：性能和内存使用取决于实现，通常是惰性计算
* 生成器：由于使用了yield，内存使用和性能优化自动管理，合适处理大数据或流数

使用场景
* 迭代器：适合需要对迭代过程进行高度控制，或者需要自定义复杂的迭代逻辑时使用
* 生成器：适合需要简洁地生成序列数据，尤其是在处理大数据或需要按需生成数据时，能够节省内存和提高性能

## 5.4 property
负责把函数当属性用，这样做可以**简化代码使用**。

定义property属性的两种方式：1.装饰器；2.类属性

### 5.4.1 装饰器方式
```python
"""
property属性介绍：
    概述/目的/作用：把函数当变量来用
    实现方法：
        方式1：装饰器
        方式2：类属性

property的装饰器用法：
    @property               修饰获取值的函数
    @获取值的函数名.setter     修饰设置值的函数
    之后可以直接.上述的函数名 来当做变量直接用
"""

# 需求：定义学生类，私有属性 age，通过property实现简化调用
# 1. 定义学生类
class Student:
    # 1.1 私有属性
    def __init__(self):
        self.__age = 18

    # 1.2 提供公共的方式方法
    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, age):
        # 可以在这里对传入的age值做判断，但是一般不做，因为实际开发中数据是从前端传过来的，已经做过判断，这里属于二次校验。
        # if age >= 0 and age <= 120:
        #     self.__age = age
        # else:
        #     print('年龄不合法')
        self.__age = age

# 2. test
if __name__ == '__main__':
    # 2.1 创建学生对象
    stu = Student()
    # 2.2 设置值
    stu.age = 20
    # 2.3 获取值
    print(stu.age)
```
### 5.4.2 类属性方式
```python
"""
property属性介绍：
    概述/目的/作用：把函数当变量来用
    实现方法：
        方式1：装饰器
        方式2：类属性

property的装饰器用法：
    @property               修饰获取值的函数
    @获取值的函数名.setter     修饰设置值的函数

property类属性的用法：
    类属性名 = property(获取值的函数名，设置值的函数名)

    之后可以直接.上述的函数名 来当做变量直接用
"""

# 需求：定义学生类，私有age属性，通过property充当类属性用
# 1. 定义学生类
class Student:
    # 1.1 私有age属性
    def __init__(self):
        self.__age = 20

    # 1.2 公共的访问方式
    def get_age(self):
        return self.__age

    def set_age(self, age):
        self.__age = age

    # 1.3 封装上述公共方式为 类属性
    # 参1：获取值的函数名，  参2：设置值的函数名
    age = property(get_age, set_age)

# 2. 测试
if __name__ == '__main__':
    # 2.1 创建学生对象
    stu = Student()
    # 2.2 设置值
    stu.age = 99
    # 2.3 获取值
    print(stu.age)
```

## 5.5 正则表达式
步骤：
1. 导包 `import re`
2. 正则匹配
   1. `result = re.match('正则表达式', '要校验的字符')`     从前向后依次匹配
   2. `result = re.search('正则表达式', '要校验的字符')`    分段查找
   3. `result = re.compile('正则表达式').sub(替换后的内容，要被替换的字符串)` 替换
3. 获取匹配结果 `result.group()`

### 5.5.1 正则替换
```python
# 导包
import re

# 1.定义字符串
s = '开心你就大声笑，哈哈，嘿嘿，呵呵，嘻嘻，桀桀桀，啦啦啦'

# 2. 把上述的'哈，嘿，呵，嘻，桀'替换为'❤'
#                   正则规则              新字符串   要被替换的字符串
result = re.compile('哈|嘿|呵|嘻|桀').sub('❤', s)

# 3. 打印结果
print(result)

# 新版api的写法
#               正则规则                 新字符串    要被替换的字符串
result = re.sub('哈|嘿|呵|嘻|桀', '♣', s)
print(result)
```
### 5.5.2 正则表达式的编写
1. 能够使用 `re` 模块匹配单个字符
```
.       匹配任意的一个字符，除了\n
[]      匹配[]中列举的字符
[^abc]  匹配除了abc以外的所有字符
\d      匹配数字，等价于[0-9]
\D      匹配非数字，等价于[^0-9]
\s      匹配空白，即tab键
\S      匹配非空白
\w      匹配非特殊字符，等价于[a-zA-Z0-9_汉字]
\W      匹配特殊字符，即非字母，非数字，非汉字
```
2. 能够使用 `re` 模块匹配多个字符
```
*       匹配前一个字符出现任意次数
+       匹配前一个字符出现至少1次
?       匹配前一个字符出现0-1次
{m}     匹配前一个字符出现m次
{m,}    匹配前一个字符出现至少m次，至多不限
{m,n}   匹配前一个字符出现从m到n次
```
3. 能够使用 `re` 模块匹配指定字符串开头或者结尾
```
^       限定开头
$       限定结尾
```
4. 能够使用 `re` 模块提取分组数据
```
|       匹配左右任意一个表达式
()      将()中的字符作为一个分组
\num    引用分组num匹配到字符串
(?P<分组名>)    设置分组
(?P=分组名)     使用分组
```