# 3. Requirements

Requirements（需求）描述系统应该做什么，以及系统必须满足哪些限制条件。

System requirements specify a system, not in terms of system implementation, but in terms of user observation. Requirements record description of the system features and constraints.

## 3.1 Functional requirements

重点：**What** system is supposed to do.

功能性需求：说明系统应该做什么，例如提供哪些服务、如何响应输入、在特定场景下如何行为，系统不应该做什么。

1. Statements of **services** the system should provide
2. How the system should **react** to particular **inputs**
3. How the system should **behave** in particular **situations**
4. May also state what the system should **NOT** do

:::danger 功能性需求
提供哪些服务；如何响应输入；特定场景下的行为；系统不该做什么。这四点背诵的时候也是背关键词，考试的时候根据关键词发挥。
:::

## 3.2 Non-functional requirements

重点：**How** the functional requirements are realized.

非功能性需求：说明系统如何实现这些功能，如安全性、可用性、响应时间、可访问性等，通常作用于整个系统而非单个功能。

1. **Constraints** on the services or functions offered by the system, and 
2. Often apply to the **whole system** rather than individual features.
   * **security**, **usability**, **responce time**, **accessibility** 

:::danger 非功能性需求
必须要背，可能会考简答题。
:::

## 3.3 General Problems

真实项目里常见问题包括：不同人用词不一致、需求冲突、用户自己说不清想要什么、需求经常变化、关键人员或信息不容易获得。

1. **Inconsistent terminalogy**: people express needs in their own words.
2. **Conflicting needs** for the same system.
3. People frequently **do not know** what they want.
4. Requirements **change** quite frequently.
5. Relevant people / information may **not be accessible**.

## 3.4 Acceptance criteria

好的 requirements 必须能变成 acceptance criteria。所以需求要满足：
1. unambiguous / precise 无歧义、精确
2. measurable 可测量
3. understandable / clear 清楚易懂

:::danger 验收标准
验收标准考的时候会考实践题，给具体案例，让你写user story或者epic，这时候写的时候就需要满足这些标准。
:::

### 3.4.1 Analysing Requirements

1. Identify **stakeholders**
2. Identify **top-level needs**
3. Break down into **user stories**
4. Write atomic **requirements** / **acceptance criteria**
5. Use **UML use case** to express functional behaviour

### 3.4.2 Stakeholder

* stakeholders
   1. users
   2. customers
   3. system administers
   4. testers
   5. developers
   6. business analyst
* surrogate stakeholders
   1. legal
   2. unavailable at present
   3. mass product users
* negative stakeholders

利益相关者不只是用户，还可以包括客户、系统管理员、测试者、开发者、业务分析师、法律/监管代表、替代利益相关者，甚至负面利益相关者。

:::danger 概念题
stakeholders 有三方面的角色，必须要背。
:::

## 3.5 Agile requirements

层级： Initiative -> Epic -> User Story。
* Initiative 是战略目标；
* Epic 是大的用户或业务目标，通常跨多个 sprint；
* User Story 是一个 sprint 内能完成的具体功能。

### 3.5.1 User Story
标准格式：As a &lt;type of user&gt;, I want to &lt;goal&gt; so that &lt;reason&gt;.

:::danger 实践题
这部分大概率考实践题，给一个实际案例，答题的时候要找题干里面的内容写 user story。
:::

### 3.5.2 INVEST for good user stories

1. **Independent**: can be worked on separately from other stories.
2. **Negotiable**: flexible and open to discussion.
3. **Valuable**: delivers clear value to the user.
4. **Estimable**: can be estimated for effort.
5. **Small**: small enough to complete within a sprint.
6. **Testable**: has clear critiria to determine if it is done.

INVEST 用来判断 user story 是否质量足够好。

:::danger 名词解释题
2026年原题，需要背名词+解释，并且可以简单举例解释。
:::

### 3.5.3 Acceptance Criteria for user stories

1. Clear: easy to understand and unambiguous.
2. Testable: should be able to test to verify that it is met.
3. Measurable: can be measured quantitatively or qualitatively.
4. Atomic: each critiria is independent, can be checked by itself.

模板：Given &lt;initial context or precondition&gt;, when &lt;action or event&gt;, then &lt;expected outcome&gt;.
:::danger 实践题
答题技巧：仔细阅读题干内容，没思路就根据题干发挥。
:::

## 3.6 Prioritisation

Prioritisation（优先级排序）主要看 user needs、business value 和 technical considerations。常用方法包括 MoSCoW 和 Value vs Effort。

* MoSCoW
  1. Must-Have: essential
  2. Should-Have: important
  3. Could-Have: nice to have
  4. Won't-Have: out of scope at present

* Value vs Effort
  1. High value, Low effort: 优先做
  2. High value, High effort: 后做
  3. Low value, Low effort: 有时间再做
  4. Low value, High effort: 避免

:::tip 实践题
这部分的内容非常简单，知道就行，题目问到的时候能给出优先级，大概率不会考名词解释。
:::

## 3.7 Use Case Model

UML Use Case（用例）部分要掌握 actor、use case、association、use-case diagram、use-case specification。
* Actor 是系统外部与系统交互的角色，可以是人、机器或另一个系统。
* Use case 是系统执行的一系列动作，给某个 actor 产生可观察的价值结果。

### 3.7.1 Use-case Model
1. describe the **interaction** between the **system** and (parts of) its **environment**.
2. describe the **functional requirements** of a system in terms of use cases.
3. links **stakeholder needs** to software **requirements**.
4. serves as a **planning tool**.
5. consists of **actors** and **use cases**.

### 3.7.2 Use-case diagram
Use-case diagram 显示 actors、use cases 和它们的关系，定义系统边界，说明谁和系统交互、系统提供哪些行为。

### 3.7.3 Use-case specification
Use-case specification 是文字版本，通常包括 use case name、brief description、basic flow、alternative flows、preconditions、postconditions、special requirements。Basic flow 是成功主路径；alternative flows 包括正常变体、特殊情况和错误流程。

:::danger 画图题
这部分会跟下一章的 OO Design 一起考画图题，大题的占比很高，一定要会。
:::