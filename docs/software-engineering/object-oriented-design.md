# Object-Oriented Design

## 复习资料

### Object-Oriented Software

Object-Oriented Software（面向对象软件）把软件结构组织成 objects 以及 objects 之间的 interactions。重点不是背图形，而是能把问题域里的角色、数据、行为和协作关系表达成 class、object、relationship 和 message。

1. Class：对象类型的蓝图，例如 Car。
2. Object：某个 class 的具体实例，例如一辆有注册号的 Ford Fusion。
3. Method / operation：对象能执行的行为。
4. Attribute：对象保存的数据或状态。

### OO Design Principles

#### Encapsulation

Encapsulation（封装）把对象的数据和行为放在对象内部，外部通过允许的方法访问。这样可以保护数据一致性，例如 private 字段只能通过 getter 或受控方法读取和修改。

#### Abstraction

Abstraction（抽象）关注核心问题，省略不必要的细节，只公开必要信息，并隐藏对象内部复杂性。游戏项目里可以把 Door、Button、MovingPlatform 抽象成 Interactable，让主循环只调用 update、render 或 onPlayerCollide。

#### Inheritance

Inheritance（继承）让子类继承父类的属性和行为，用于表达 is-a 关系和复用代码。例如 Entity 可以作为 Player、Enemy、Projectile 的父类。但继承要克制使用，如果对象差异很大，composition 往往更稳。

#### Polymorphism

Polymorphism（多态）允许子类对象替代父类对象使用，具体行为由子类决定。例如 entities.forEach(e =&gt; e.update(dt))，主循环不需要知道每个 entity 的具体类型。

#### Composition

Composition（组合）表示对象由其他对象组成，可以增量构建和复用。例如 Player 可以包含 MovementController、StressMeter 或 Inventory。组合通常比过深的继承层级更低耦合。

### UML Class Diagrams

Class diagram（类图）是系统的静态视图，用来展示 classes、attributes、operations 以及 classes 之间的 structural relationships。

#### Attribute and operation notation

Attribute 常见格式是 [visibility] name [: type] [multiplicity] [= value] [{property}]。Operation 常见格式是 [visibility] name(parameter-list) : returnType [{property}]。

1. + public：外部可访问
2. - private：只在 class 内部可访问
3. # protected：子类可访问
4. ~ package：包内可访问

#### Grammatical parse

Grammatical parse 是从需求文本里找名词，去掉重复、同义、无关或超范围的词，再判断哪些名词真的需要持久状态和行为。只有有状态和行为的概念才适合成为 class。

### Structural Relationships

1. Association：对象之间有关联或连接。
2. Multiplicity：一端的一个实例对应另一端多少实例，例如 1、0..1、0..*。
3. Aggregation：弱整体-部分关系，part 可以独立存在。
4. Composition：强整体-部分关系，part 生命周期依赖 whole。
5. Generalization：is-a 关系，用于继承层次。
6. Navigability：是否可以沿关联从一个对象导航到另一个对象。

例子：一个 Level 有 0..* Hazards；一个 Hazard 属于 1 个 Level。Level 和 Tile 更像 composition，因为 Tile 通常不脱离 Level 独立存在。

### UML Sequence Diagrams

Sequence diagram（序列图）展示对象如何按时间顺序通过 messages 协作，适合描述复杂场景、实时流程、分支、循环、异常和对象之间的责任分配。

1. Actor / object：参与交互的人或对象
2. Lifeline：参与者在时间轴上的存在
3. Message：对象之间的调用或信号
4. Return message：返回结果或控制流
5. alt frame：分支场景
6. loop frame：重复场景

分析 sequence diagram 时，可以从一个具体 scenario 出发：哪些对象参与？谁触发下一步？每个对象执行什么 operation？哪些消息需要返回？是否有 primary、variant 或 exception flow？

## 必背重点

- OO software 以 objects 和 interactions 组织系统。
- Class 是蓝图，object 是具体实例。
- Encapsulation 保护对象内部状态；abstraction 隐藏不必要细节。
- Inheritance 表达 is-a 和代码复用，但不要滥用。
- Polymorphism 让不同子类通过同一接口被调用。
- Composition 表达 has-a / part-of，通常比深继承更低耦合。
- Class diagram 是静态结构图；sequence diagram 是动态交互图。
- Association、aggregation、composition、generalization 的含义要区分清楚。
- Multiplicity 用来说明一个对象和另一类对象的数量关系。

## 答题模板

Object-oriented design structures software around objects and their interactions. A class defines the structure and behaviour of a type of object, while an object is a concrete instance of that class.

Encapsulation protects an object's internal state by allowing access only through controlled methods. Abstraction hides unnecessary implementation detail and exposes only the information needed by other parts of the system.

Inheritance can be used when one class is a specialised form of another class. However, composition is often preferable when an object should be built from reusable parts without creating a rigid inheritance hierarchy.

A class diagram shows the static structure of a system, including classes, attributes, operations and relationships. A sequence diagram shows how objects collaborate over time by sending messages to complete a scenario.

> 答题时要把原则和设计选择连起来，例如为什么某处用 composition 而不是 inheritance，或者为什么 sequence diagram 能补充 class diagram 看不到的动态行为。

## 模拟考题

- Explain the difference between a class and an object.
- Explain encapsulation and abstraction in object-oriented design.
- Compare inheritance and composition. When might composition be preferable?
- What is polymorphism, and why is it useful in software design?
- Explain the purpose of a UML class diagram.
- Explain the purpose of a UML sequence diagram.
- Describe the difference between aggregation and composition.
