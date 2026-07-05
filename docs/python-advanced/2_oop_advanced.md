# 第二章 面向对象高级
1. 定义类的几种语法
2. Python中的继承
3. Python中的封装
4. Python中的多态
5. 面向对象的其他特性

## 1. 定义类的几种语法
- 方法1：类名
- 方法2：类名()
- 方法3：类名(object) 最常用的方式

## 2. Inheritance
在Python中，所有类默认继承object类，object类是**顶级类**或**基类**，其他子类叫派生类。
当子类继承父类时，子类拥有和父类完全一样的功能，但是不用再写大量重复代码。
* 优势：提高代码复用率，减少重复代码的书写。
* 弊端：耦合性增强，父类不好的部分子类都会有。
* 开发原则：高内聚，低耦合。内聚：类自己处理问题的能力；耦合：类与类之间的关系。

### 2.1 单继承
一个子类只能继承一个父类，不能继承多个类。这个子类有父类的属性和方法。

### 2.2 多继承
一个类同时继承多个父类，并且同时具有所有父类的属性和方法。
* 注意：当一个类有多个父类时，默认继承第一个父类的同名属性和方法，可以使用 class.__mro__attribute 或 class.mro() 的方法查看调用的先后顺序。
* MRO: method resolution order 方法解析顺序
```
# 查看mro机制的结果
print(Prentice.mro()) # Prentice -> School -> Master -> object
print(Prentice.__mro__)
"""
[<class '__main__.Prentice'>, <class '__main__.Master'>, <class '__main__.Training'>, <class 'object'>]
(<class '__main__.Prentice'>, <class '__main__.Master'>, <class '__main__.Training'>, <class 'object'>)
"""
```

### 2.3 Override
重写=覆盖，子类属性或方法与父类命名相同时，父类继承下来的成员可以重新定义.

### 2.4 子类调用父类方法
1. 子类想保留父类的行为，则需要在子类中调用父类方法，可以直接使用父类名在调用，使用方法：`parent.parentmethod(self)`
2. 使用 `super()` 调用父类方法，使用的方法：`super().parentmethod()`
   - 使用 `super()` 可以自动查找父类，适合**单继承**使用，多继承不建议

### 2.5 多层继承
C继承B，B继承A这种结构的多层继承关系。

## 3. Encapsulation
在软件编程中，将**属性和方法**书写到类的里面的操作。封装可以为属性和方法添加**私有权限**。
* 优势：安全性、复用性
* 弊端：代码量显著增加

在Python中可以为属性和方法设置私有权限，即设置某个属性或方法不继承给子类。设置私有属性和方法的方式：在属性或方法名前加`__`，格式：
```
# private attribute
__attribute

# private method
def __method():
```

私有属性和方法使用规则：
* 只能在类的**内部**使用，不能在外部使用；
* 如果想在类外部使用，通过**公共接口**。

### 3.1 私有属性
不用继承给子类的属性被称为私有属性，在属性或方法名前加上`__`，就可以设置私有属性或方法。

### 3.2 私有方法
私有属性不能直接访问，在Python中，一般定义方法名`get__attribute`用来获取私有属性，定义`set__attribute`用来修改私有属性值。

## 4. Polymorphism
同一个**函数**，传入不同的对象，得到不同的状态。
* 优势：应用解耦，同函数不同效果
* 弊端：无法精准限定类型

### 4.1 成立条件
python 是伪多态，即便都没有实现，系统也不会报错。
1. 有继承（定义父类、定义子类，子类继承父类）
2. 函数重写（子类重写父类函数）
3. 父类引用指向子类对象（子类对象传给父类对象调用者）
```python
构建对象对战平台object_play
    1 英雄一代机（战力60）与敌军栈机（战力70）对抗。英雄一代栈机失败！
    2 卧薪尝胆，英雄二代机（战力80）出场，战胜敌军战机！
    3 对象对战平台 object_play，代码不变，完成多次战斗
思路分析
    抽象战机类 HeroFighter, AdvHeroFighter；敌方战机 EnemyFighter
    构建对象战斗平台，使用多态实现
```
### 4.2 优势
1. 在不改变框架代码的情况下，通过**多态语法**轻松实现模块与模块之间的解耦合，实现了软件系统的**可拓展性**；
2. 解耦合：搭建平台函数相当于任务的调用者，子类、孙子类重写父类函数，相当于子任务，即**任务的调用者**和**任务的编写者**进行解耦合；
3. 可拓展：搭建的**平台函数**可以在不做任何修改的情况下，调用之后工程师写的代码。

### 4.3 抽象类
父类用来确定有哪些方法（父类指定接口标准），具体的方法实现由子类实现（子类实现接口标准），这种写法属于抽象类。
* 抽象类：含有抽象方法的类
* 抽象方法：方法体是空实现，即 `pass` 的称之为抽象方法
* abstract class = interface = standard

配合多态，可以完成：
* 抽象的父类设计（设计标准）
* 具体的子类实现（实现标准 ）

## 5. 面向对象的其他特性
### 5.1 对象属性
属性：类或对象中定义的属性。`object.attribute` 和 `self.sttribute`

### 5.2 类属性
类所拥有的属性，它能被整个类共享（即可以直接调用）。
```python
Class.attribute     # 推荐使用
object.attribute
```

### 5.3 类方法
类所拥有的方法，并需要使用装饰器 `@classmethod` 来标识其为类方法，同时一定要注意的是对于类方法的第一个参数必须是类对象，通常以cls作为第一个参数名。

### 5.4 静态方法
需要通过装饰器 `@staticmethod` 来标识其为静态方法，且静态方法**不需要定义参数**。

## 6. Python综合案例：学生信息管理系统
### 6.1 需求分析
开始 -》总程序入口 -》显示操作界面（添加，修改，删除，查询，显示所有，保存信息，退出系统） -》结束

1. 使用面向对象、字符串、列表、字典、文件等知识点来完成一个学生管理系统V2.0；
   1. 可以显示基本的版本信息和操作界面；
   2. 可以通过键盘输入信息来完成基本功能，例如选择序号、确认退出、添加学生、修改信息等；
   3. 学生属性姓名有姓名、性别、年龄、联系方式、描述信息等；
   4. 使用系统可对学生信息进行增删改查；
   5. 可以使用文件对学生信息进行加载或保存等；
   6. 可重复对学生进行增删改查操作，当确认退出系统后，直接退出系统；
   7. 请使用面向对象编程思想完成项目的升级处理；
2. 针对学生，该系统具有添加、修改、删除、查询所有学生/单个学生、保存信息、退出系统等操作；
3. 角色分析
   1. 角色1：学生管理系统 Student
   2. 角色2：学生管理系统 StudentCMS（content management system）
   3. 注意：为了方便维护代码，一个角色一个文件，项目的程序主入口，习惯为 `main.py`
4. 项目文件规划
   1. 创建项目目录，例如 `StudentManagerSystem` 程序文件如下：
      * 程序入口文件：`main.py`
      * 学生文件：`student.py`
      * 管理系统文件：`studentcms.py`

### 6.2 开发实践
一. 学生类文件：`student.py`

二. 学生管理系统文件：`studentcms.py`
   1. 创建学生管理系统类
   2. 存储数据的形式：列表存储学生对象
   3. 显示界面
   4. 系统功能
      * 添加学生信息
      * 删除学生信息
      * 修改学生信息
      * 查询学生信息
      * 显示所有学生信息
      * 保存学生信息
      * 退出系统
   5. 搭建项目基本框架：为了便于后期快速开发，一般在项目初期会根据项目开发需求进行搭建基本项目框架，以便更高效开发。
       1. 需求：系统功能循环使用，用户输入不同的功能序号执行不同功能。
       2. 步骤：
       * 定义程序入口函数 `start()` ：
         * 模拟系统启动用户等待
         * 显示功能菜单
         * 用户输入功能序号
         * 根据用户输入的功能序号执行不同功能，同时考虑程序稳定性
       * 定义系统功能函数，添加、删除学生等
   6. 退出系统：退出前必须要能反复多次显示操作界面
      * 能反复多次的选择操作序号来执行功能；
      * 用户想退出时，可以输入 `y` 或 `Y` 后退出系统的继续执行。

三. 程序主入口文件：`main.py`

### 6.3 具体实现代码
#### 6.3.1 添加学生信息
```python
# 1.添加学生信息
def add_student(self):
    name = input('input student name: ')
    gender = input('input student gender: ')
    age = input('input student age: ')
    phone = int(input('input student phone: '))
    desc = input('input student description: ')

    # 把上述信息封装成学生对象
    stu = Student(name, gender, age, phone, desc)
    self.stu_list.append(stu)
    print(f'add {name} student info successfully\n')
```

#### 6.3.2 修改学生信息
```python
# 2.用户输入目标学生姓名，cms遍历学生数据列表。
# 如果用户输入的学生姓名存在，则修改该学生其他信息，否则提示该学生不存在。
def modify_student(self):
    mod_name = input('input student name you want to modify: ')
    for stu in self.stu_list:
        if stu.name == mod_name:
            # 提示用户录入新的学生信息
            print(f'Now you can input new info about {mod_name}!')
            stu.gender = input('input modified student gender: ')
            stu.age = int(input('input modified student age: '))
            stu.phone = int(input('input modified student phone: '))
            stu.desc = input('input modified student description: ')

            print(f'Modified {mod_name} student info successfully\n')
            break
    else:
        print(f'{mod_name} student info did not found, please check the info first!\n')

```

#### 6.3.3 删除学生信息
```python
# 3.用户输入目标学生姓名，cms遍历学生数据列表
# 如果用户输入的学生姓名存在，则删除，否则提示该学生不存在。
def delete_student(self):
    del_name = input('input student name you want to delete: ')
    for stu in self.stu_list:
        if stu.name == del_name:
            self.stu_list.remove(stu)
            print(f'remove {del_name} student info successfully\n')
            break
    else:
        print(f'{del_name} student info did not found.\n')
```

#### 6.3.4 查询学生信息
```python
# 4.用户输入目标学生姓名，cms遍历学生数据列表。
# 如果用户输入的学生姓名存在，则打印学生信息，否则提示该学生不存在。
def query_particular_student(self):
    query_name = input('input student name you want to query: ')
    for stu in self.stu_list:
        if stu.name == query_name:
            print(stu, end='\n')
            break
    else:
        print(f'{query_name} student info did not found.\n')
```

#### 6.3.5 显示所有学生信息
```python
# 5. 显示所有学生信息，便于浏览：遍历学生数据列表并打印所有信息
def show_student(self):
    # 5.1. 判断列表长度，如果长度为0，需要提示：暂无学生信息
    length_list = len(self.stu_list)
    if length_list == 0:
        print('no student info, please add student information first!\n')
    # 5.2. 如果长度不为0，遍历并打印所有学生信息
    for stu in self.stu_list:
        print(stu)
    print()
```

#### 6.3.6 保存信息
```python
# 6. 保存学生信息：将修改以后的学生数据保存到存储数据的文件
# 步骤：打开文件 -> 将列表中的学生转换为String类型写入文件 -> 关闭文件
def save_student(self):
    # 关联学生信息文件
    with open('./stu_data.txt', 'w', encoding='utf-8') as dest_file:
        # 把 [stu_object, stu_object, Stu_object] → [dic, dic, dic]
        stu_dict = [stu.__dict__ for stu in self.stu_list]
        # 把字典列表，持久化到文件中
        dest_file.write(str(stu_dict))  # 务必转成字符串再写入，否则会报错
```
