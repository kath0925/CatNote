# Agile Software Development

## 复习资料

### Agile Manifesto

敏捷宣言：

1. Individuals and interactions over processes and tools
2. Working software over comprehensive documentation
3. Customer collaboration over contract negotiation
4. Responding to change over following a plan

### Extreme Programming / XP

Extreme Programming / XP（极限编程）

#### XP Ethos

极限编程基本理念：

1. Simple design: use the simplest way to implement features 简单设计
2. Sustainable pace: effort is constant and manageable 可持续的工作
3. Coding standards: teams follow an agreed style and format 编码标准
4. Collective ownership: everyone owns all the code 集体所有权
5. Whole team approach: everyone is included in everything 整体的团队方法

#### XP Practices

极限编程对应的实践：

1. Pair programming: two heads are better than one 结对编程
2. Test driven: ensure the code runs correctly 测试驱动
3. Small releases: deliver frequently and get feedback from the client 小版本
4. Continuous integration: ensure the system is operational 持续集成
5. Refactor: restructure the system when things get messy 重构

#### Pair programming

结对编程要记住两个角色：helm（掌舵者，实际敲键盘）和 tactician（策略者，思考风险、设计影响和重构机会）。

它不是“两个人分开写两份代码”，而是一台机器、同步讨论、边写边 review。

### Test-driven development

TDD (Test-driven development)：测试驱动开发：逻辑是先写 tests（测试），再写刚好通过测试的代码；如果没有测试支持，这个 feature（功能）原则上不应被实现。

#### Benefits

1. code coverage代码覆盖
2. simplified debugging简化调试
3. 并让测试本身成为 system documentation（系统文档）的一部分

### Scrum

敏捷项目管理框架要记住角色和事件：

#### Roles

- Product Owner（产品负责人）负责愿景和 backlog（待办列表）优先级；
- Scrum Master（敏捷教练/流程负责人）负责移除障碍和维护流程；
- Developers（开发团队）负责实现、测试、交付。

#### Events

Sprint（冲刺）是短周期开发迭代，daily scrum / stand-up（每日站会）用于同步进展；

Kanban（看板）核心是把工作从 To Do 到 Done 可视化，常见列包括 To Do、In Progress、Done，也可以按团队需要增加 Backlog、Being Verified、Awaiting Integration，但必须有 Done。

### Problems with Agile

Agile 的局限：

1. 完整规格不会一开始全部写死，所以法律合同较难制定；
2. 适合 green-field development（新系统从零开始），但对 brownfield development（维护旧系统）不一定理想；
3. 小型 co-located team（同地小团队）效果较好，但 large distributed development（大型分布式团队）会更难；
4. 依赖团队成员知识，如果人员离开，风险会上升。

## 必背重点

- Agile 和 Waterfall 的核心区别：Waterfall 是 sequential（顺序式）的，Agile 是 iterative（迭代式）的。
- Waterfall 通常依赖 upfront requirements（前期完整需求），Agile 接受 requirements may change（需求可能变化）。
- Agile 通过 sprint、working software、customer feedback 和 continuous improvement 来降低需求不确定性带来的风险。
- 答题时不要只写 Agile is flexible。必须说明它是如何 flexible 的：通过短周期迭代、频繁反馈、持续交付和客户协作。

## 答题模板

Agile software development is an iterative approach that delivers working software in small increments. Unlike Waterfall, which follows a sequential process with most requirements defined upfront, Agile accepts that requirements may change. It uses short iterations, customer collaboration and regular feedback to adapt the product during development. This makes Agile suitable for projects with uncertain or changing requirements.

> 如果题目要求 compare Agile and Waterfall，必须同时写两者差异，不要只解释 Agile。

## 模拟考题

- Compare Agile software development with the Waterfall model.
- Explain why Agile is suitable for projects with changing requirements.
- Give one advantage and one disadvantage of Agile software development.
