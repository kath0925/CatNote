# 第一章 面向对象编程基础
- 面向过程：强调以步骤为基础完成各种操作；
- 面向对象：强调以**对象**为基础完成各种操作，基于面向过程的
    - 思想特点：1. 更符合人们的思考习惯；2. 把复杂事情简单化；3. 把程序员从执行者变成指挥者

## 1. Self 关键字
Python内置关键字，用于指向对象实例本身
* 案例：在类内部调用方法：
```python
class Car:
    def run(self):
        print("Car is running")

    # 如果类的内部调用方法：self.method()
    def work(self):
        self.run()

# 创建对象
car = Car()
# 工作
car.work()
```

## 2. 添加和获取对象属性
* 属性：固有特征，在Python中用**变量**表示，比如身高、体重等；
* 设置属性：object.attribution = attribution value
* 获取属性值：object.attribution

## 3. 魔法方法
Python内置函数，在特定场景下会被**自动调用**。常用魔法方法：
```
__init__()
__str__()
__del__()

__magicMethod__() 魔法方法
__magicMethod() 私有方法
```

### 3.1 init()方法
自动调用：创建对象时，被Python解释器自动调用，初始化对象属性。
* 无参数情况：不需要外部传递参数，初始化属性值
* 有参数情况：需要外部传递参数，初始化属性值

### 3.2 str()方法
自动调用：当使用print输出对象时，默认打印对象的内存地址；如实现了__str__()方法，print就自动调用该魔法方法。
```
def __str__(self):
    # ...
    return 字符串结果
```

### 3.3 del() 方法
自动调用：当删除对象（调用del删除对象或文件执行结束后），Python解释器会默认**自动调用**del()方法。即 `def __del__(self):`