# Requirements

## 复习资料

### Requirements

Requirements（需求）描述系统应该做什么，以及系统必须满足哪些限制条件。System requirements specify a system, not in terms of system implementation, but in terms of user observation. Requirements record description of the system features and constraints.

### Functional requirements

功能性需求：说明系统应该做什么，例如提供哪些服务、如何响应输入、在特定场景下如何行为，系统不应该做什么。

1. Statements of services the system should provide
2. How the system should react to particular inputs
3. How the system should behave in particular situations
4. May also state what the system should NOT do

### Non-functional requirements

非功能性需求：说明系统如何实现这些功能，如安全性、可用性、响应时间、可访问性等，通常作用于整个系统而非单个功能。

Non-functional requirements are constraints on the services or functions offered by the system, and often apply to the whole system rather than individual features.

### Why Requirements Engineering matters

真实项目里常见问题包括：不同人用词不一致、需求冲突、用户自己说不清想要什么、需求经常变化、关键人员或信息不容易获得。

### Acceptance criteria

好的 requirements 必须能变成 acceptance criteria。所以需求要满足 unambiguous / precise（无歧义、精确）、measurable（可测量）、understandable / clear（清楚易懂）。

### 需求分析路径

1. Identify stakeholders
2. Identify top-level needs
3. Break down into user stories
4. Write atomic requirements / acceptance criteria
5. Use UML use case to express functional behaviour

### Stakeholder

Stakeholder（利益相关者）不只是用户，还可以包括客户、系统管理员、测试者、开发者、业务分析师、法律/监管代表、surrogate stakeholders，甚至 negative stakeholders。

### Agile requirements

Agile requirements 的层级是 Initiative -> Epic -> User Story。Initiative 是战略目标；Epic 是大的用户或业务目标，通常跨多个 sprint；User Story 是一个 sprint 内能完成的具体功能。

User Story 标准格式：As a &lt;type of user&gt;, I want to &lt;goal&gt; so that &lt;reason&gt;.

### INVEST

1. Independent
2. Negotiable
3. Valuable
4. Estimable
5. Small
6. Testable

INVEST 用来判断 user story 是否质量足够好。

### Acceptance Criteria

Acceptance Criteria 要 Clear、Testable、Measurable、Atomic。Given-When-Then 模板是：Given &lt;initial context or precondition&gt;, when &lt;action or event&gt;, then &lt;expected outcome&gt;.

### Prioritisation

Prioritisation（优先级排序）主要看 user needs、business value 和 technical considerations。常用方法包括 MoSCoW 和 Value vs Effort。

### MoSCoW

1. Must-Have: essential
2. Should-Have: important
3. Could-Have: nice to have
4. Won't-Have: out of scope at present

### Value vs Effort

1. High value, Low effort: 优先做
2. High value, High effort: 后做
3. Low value, Low effort: 有时间再做
4. Low value, High effort: 避免

### UML Use Case

UML Use Case（用例）部分要掌握 actor、use case、association、use-case diagram、use-case specification。Actor 是系统外部与系统交互的角色，可以是人、机器或另一个系统。Use case 是系统执行的一系列动作，给某个 actor 产生可观察的价值结果。

#### Use-case diagram

Use-case diagram 显示 actors、use cases 和它们的关系，定义系统边界，说明谁和系统交互、系统提供哪些行为。

#### Use-case specification

Use-case specification 是文字版本，通常包括 use case name、brief description、basic flow、alternative flows、preconditions、postconditions、special requirements。Basic flow 是成功主路径；alternative flows 包括正常变体、特殊情况和错误流程。

## 必背重点

- Functional requirements 关注系统做什么；Non-functional requirements 关注系统做得怎么样。
- Requirements Engineering 的核心价值是减少歧义、冲突、遗漏和变化带来的风险。
- 好的 requirement 应该 clear、measurable、testable、unambiguous。
- Agile requirements 层级：Initiative -> Epic -> User Story。
- User Story 格式：As a user, I want a goal, so that I get value。
- INVEST 用来判断 user story 质量。
- Acceptance Criteria 要 Clear、Testable、Measurable、Atomic。
- MoSCoW 用来做需求优先级排序。
- Use case 从 actor 目标出发描述系统交互，不是普通功能列表。

## 答题模板

Functional requirements describe what the system should do, such as the services it provides and how it responds to inputs. Non-functional requirements describe constraints or quality attributes of the system, such as performance, usability, security and reliability.

Requirements Engineering is important because stakeholders may use inconsistent terminology, have conflicting needs, or be unable to explain what they want clearly. Requirements may also change frequently. A systematic requirements process helps reduce ambiguity and supports design, implementation and testing.

A good user story should follow INVEST: it should be independent, negotiable, valuable, estimable, small and testable. This helps ensure that the story can be understood, planned and completed within an iteration.

A use case describes how an external actor interacts with the system to achieve a goal. It helps define the system boundary, expected behaviour and value delivered to the actor.

## 模拟考题

- Explain the difference between functional and non-functional requirements.
- Why is Requirements Engineering important in software development?
- What are the qualities of good acceptance criteria?
- Explain the INVEST criteria for good user stories.
- Define actor and use case in a UML use-case model.
- Explain how MoSCoW can be used to prioritise requirements.
