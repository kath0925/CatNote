# Introduction

## 复习资料

### Software Crisis

Software Crisis（软件危机）指的是：随着软件规模越来越大、复杂度越来越高，传统“靠程序员直接写代码”的方式越来越难保证项目按时、按预算、按质量交付，导致大量软件项目失败或产生严重后果。

Lecture 1 明确提到原因包括：software is getting larger and larger、more complex、涉及复杂领域如 human behaviours、energy and cars，系统依赖更强，同时 time to market 更短。

#### Why Do Software Projects Fail?

课程用 Ariane 5、Mars Climate Orbiter、Therac-25 说明：软件失败往往不是单个程序员粗心，而是 requirements、integration、testing、reuse、safety validation 和 process management 出了系统性问题。

Bad developers - not the main problem!

1. Over budget
2. Poor requirements
3. Over-ambitious requirements
4. Unnecessary requirements
5. Contract management
6. End-user training
7. Operational management

考试中要把失败归因到 system/process level（系统/过程层面），不要归因到“程序员不努力”。

### Software Engineering

Engineering: cost-effective solutions to practical problems by applying scientific knowledge to building things for people.

课程的定义可以拆成四部分：

1. cost-effective solutions（成本有效的解决方案）
2. practical problems（现实问题）
3. scientific knowledge（科学知识，如 modelling、proofs、testing、simulation、patterns）
4. building things for people（为客户和最终用户构建软件）

#### SDLC: Software Development Life Cycle

SDLC 关心的是哪些任务要做、按什么顺序做。

基本任务：Requirements Analysis（需求分析）、Planning（计划）、Design（设计）、Development（开发）、Testing（测试）、Deployment（部署）、Operation and Maintenance（运营与维护）。

#### SDLC: Examples

Waterfall、Agile、V-Model、Spiral 都是不同的 SDLC process（生命周期过程）安排。

### Verification vs Validation

高频考点。

Verification 是 “Are you building it right?”，即检查系统是否符合 requirements、constraints、regulations，关注是否按规格正确构建。

Validation 是 “Are you building the right thing?”，即检查系统是否真正满足 customers/stakeholders 的需要。

注意区分：一个系统可能 pass verification but fail validation（通过验证但确认失败），因为它完全按规格实现，但规格本身没有解决用户真实问题。

### Waterfall

考试表达的时候，应该用它适合需求稳定、监管强、文档要求高的项目；不适合需求模糊、用户反馈重要、系统交互复杂的项目这样的表达方式，而不是简单说它不好。

#### Advantages

1. Simple to use and understand
2. Every phase has a defined result and process review
3. Development stages go one by one
4. Perfect for projects where requirements are clear and agreed upon
5. Easy to determine the key points in the development cycle
6. Easy to classify and prioritize tasks

#### Disadvantages

1. The software is ready only after the last stage is over
2. High risks and uncertainty
3. Misses complexity due to interdependence of decisions
4. Not suited for long-term projects where requirements will change
5. The progress of the stage is hard to measure while it is still in the development
6. Integration is done at the very end, which does not give the option of identifying the problem in advance

### Insulin Pump case

这个案例适合用来考 Waterfall 是否合适。

支持 Waterfall 的理由：它是 safety-critical system（安全关键系统），需要严格 requirements、review、documentation、verification；医疗设备也可能有 regulatory constraints（监管约束）。

反对 Waterfall 的理由：真实用户需求复杂，剂量算法、传感器反馈、用户场景、风险控制可能需要反复验证；如果集成和用户验证太晚，安全风险会被延后发现。

## 必背重点

- Software Crisis 的根本问题是软件规模、复杂度、依赖关系和交付压力增长，传统直接写代码的方法不够可靠。
- 项目失败要从 system/process level 分析，例如 poor requirements、integration、testing、contract management、end-user training 和 operational management。
- Software Engineering 强调 cost-effective、practical problems、scientific knowledge 和 building things for people。
- SDLC 包括 requirements analysis、planning、design、development、testing、deployment、operation and maintenance。
- Verification = building it right；Validation = building the right thing。
- Waterfall 适合 requirements 稳定、阶段明确、监管或文档要求强的项目；不适合 requirements 会变、用户反馈重要、复杂度和不确定性高的项目。

## 答题模板

Software Engineering is needed because modern software systems are large, complex and often safety-critical. Software failures are usually caused by problems in requirements, integration, testing, validation and process management rather than simply by bad developers.

Verification asks whether the system is built correctly according to requirements, constraints and regulations. Validation asks whether the right system has been built for the real needs of customers and stakeholders.

Waterfall is suitable for projects with clear and stable requirements, defined phases, strong documentation needs and regulatory constraints. However, it is less suitable for projects where requirements are uncertain, user feedback is important, or integration risks need to be discovered early.

> 答题时不要只背定义，要把概念和项目失败、真实约束、用户需求或安全风险联系起来。

## 模拟考题

- Explain what is meant by the software crisis.
- Why do software projects fail? Give examples beyond bad developers.
- Explain the difference between verification and validation.
- Under what conditions is the Waterfall model suitable?
- Discuss whether Waterfall is appropriate for a safety-critical system such as an insulin pump.
