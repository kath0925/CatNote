# 2. Agile Software Development
极限编程理念和实践，在样卷和2026年的考题中都明确考到，所以必须要背名词和解释。

## 2.1 Agile Manifesto
敏捷宣言：
1. **Individuals** and interactions over **processes** and tools
2. **Working** software over comprehensive **documentation**
3. Customer **collaboration** over **contract** negotiation
4. **Responding** to change over **following** a plan

:::warning 重点
前后不是选择的关系，是前者比后者更好的关系。
1. 个体与互动 ＞ 流程与工具
2. 可运行软件 ＞ 完整文档
3. 客户协作 ＞ 合同谈判
4. 响应计划 ＞ 遵循计划
:::

## 2.2 Extreme Programming(XP) Ethos
极限编程基本理念：
1. **Simple design**: use the simplest way to implement features
2. **Sustainable pace**: effort is constant and manageable
3. **Coding standards**: teams follow an agreed style and format
4. **Collective ownership**: everyone owns all the code
5. **Whole team approach**: everyone is included in everything

:::danger 重点！
必须背诵，样卷和2026年的考试中都明确的考到，需要记得名词并解释。
1. 简单设计
2. 可持续的工作
3. 编码标准
4. 集体所有权
5. 整体的团队方法
:::

## 2.3 XP Practices
极限编程对应的实践：
1. **Pair programming**: two heads are better than one
2. **Test driven**: ensure the code runs correctly
3. **Small releases**: deliver frequently and get feedback from the client
4. **Continuous integration**: ensure the system is operational
5. **Refactor**: restructure the system when things get messy

:::danger 重点！
必须背诵，样卷和2026年的考试中都明确的考到，需要记得名词并解释。
1. 结对编程； 2. 测试驱动； 3. 小版本； 4. 持续集成； 5. 重构

记忆口诀：双人先测，小步集成，脏了重构
:::

### 2.3.1 Pair programming
结对编程要记住两个角色： 
* **helm** （掌舵者，实际敲键盘）
* **tactician** （策略者，思考风险、设计影响和重构机会）。

它不是“两个人分开写两份代码”，而是一台机器、同步讨论、边写边 review。

### 2.3.2 Test-driven development(TDD)
测试驱动开发：
1. Tests are **written before code**.
2. Programming's job is to write code to **pass the tests**.
3. If there's no test for a feature, then it is not implemented.
4. Tests are informed by the requirements of the system.

逻辑是先写测试，再写刚好通过测试的代码；如果没有测试支持，这个功能原则上不应被实现。
:::warning 提示
这部分的内容大概率考综合题，背关键词。
:::

* **Benefits**
    1. code coverage代码覆盖
    2. simplified debugging简化调试
    3. 并让测试本身成为 system documentation（系统文档）的一部分

* **Scrum**
    1. **Roles**:
       * Product Owner（产品负责人）负责愿景和 backlog（待办列表）优先级；
       * Scrum Master（敏捷教练/流程负责人）负责移除障碍和维护流程；
       * Developers（开发团队）负责实现、测试、交付。
  
    2. **Events**:
       * Sprint（冲刺）是短周期开发迭代，daily scrum / stand-up（每日站会）用于同步进展；
       * Kanban（看板）核心是把工作从 To Do 到 Done 可视化，常见列包括 To Do、In Progress、Done，也可以按团队需要增加 Backlog、Being Verified、Awaiting Integration，但必须有 Done。

## 2.4 Problems with Agile
Agile 的局限：
1. 完整规格不会一开始全部写死，所以法律合同较难制定；
2. 适合 green-field development（新系统从零开始），但对 brownfield development（维护旧系统）不一定理想；
3. 小型 co-located team（同地小团队）效果较好，但 large distributed development（大型分布式团队）会更难；
4. 依赖团队成员知识，如果人员离开，风险会上升。

:::info
这部分需要了解，综合题里面会考，主要还是理解agile的优劣。
:::

## 模拟考题
1. Explain why Agile is suitable for projects with changing requirements.
:::details 参考答案
Agile software development is an iterative approach that delivers working software in small increments. Unlike Waterfall, which follows a sequential process with most requirements defined upfront, Agile accepts that requirements may change. It uses short iterations, customer collaboration and regular feedback to adapt the product during development. This makes Agile suitable for projects with uncertain or changing requirements.
:::