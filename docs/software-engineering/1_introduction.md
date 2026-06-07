# 1. Introduction
这部分基本上不出单独的题，都会在 Part-B 的部分出综合大题，答题时不要只背定义，要把概念和项目失败、真实约束、用户需求或安全风险联系起来。

## 1.1 Software Crisis
Software Crisis（软件危机）指的是：随着软件规模越来越大、复杂度越来越高，传统“靠程序员直接写代码”的方式越来越难保证项目按时、按预算、按质量交付，导致大量软件项目失败或产生严重后果。产生软件危机的原因是：

1. software is getting **larger and larger**
2. software is getting **more complex**
   * complex domains: human behaviours
   * system dependency: energy and cars
3. time to market is **shorter** than ever.

:::danger 高频考点
英文部分是高频考点，需要背诵。
:::

## 1.2 软件工程失败原因
用 Ariane 5、Mars Climate Orbiter、Therac-25 说明：软件失败往往不是单个程序员粗心，而是 requirements、integration、testing、reuse、safety validation 和 process management 出了系统性问题。

**Bad developers - not the main problem!**
1. **Over budget**
   * Poor requirements
   * Over-ambitious requirements
   * Unnecessary requirements
2. **Contract management**
3. **End-user training**
4. **Operational management**

:::warning 答题技巧
这部分一般会在综合题里面考，所以英文的关键属性需要背诵。考试中要把失败归因到 system/process level（系统/过程层面），不要归因到“程序员不努力”。
:::

## 1.3 Software Engineering
**Engineering: cost-effective solutions to practical problems by applying scientific knowledge to building things for people.**
:::danger 高频考点
重点！一定要背！
:::

课程的定义可以拆成四部分：
1. cost-effective solutions（成本有效的解决方案）
2. practical problems（现实问题）
3. scientific knowledge（科学知识，如 modelling、proofs、testing、simulation、patterns）
4. building things for people（为客户和最终用户构建软件）

## 1.4 SDLC: Software Development Life Cycle
软件发展生命周期（SDLC）关心的是哪些任务要做、按什么顺序做。

基本任务：
1. Requirements Analysis（需求分析）
2. Planning（计划）
3. Design（设计）
4. Development（开发）
5. Testing（测试）
6. Deployment（部署）
7. Operation and Maintenance（运营与维护）

## 1.5 SDLC: Examples
不同的 SDLC process（生命周期过程）安排：
1. Waterfall
2. Agile
3. V-Model
4. Spiral

## 1.6 Verification vs Validation
* **Verification: Are you building it right?**
  * 即检查系统是否符合 requirements、constraints、regulations，关注是否按规格正确构建。
* **Validation: Are you building the right thing?**
  * 即检查系统是否真正满足 customers / stakeholders 的需要。
:::warning 易混淆知识点
verificaiton 和 validation 的区别要注意区分，一个系统可能通过验证但确认失败，因为它完全按规格实现，但规格本身没有解决用户真实问题。
:::

## 1.7 Waterfall
### Advantages
1. **Simple** to use and understand
2. Every phase has a **defined** result and process review
3. Development stages go **one by one**
4. Perfect for projects where requirements are **clear** and **agreed upon**
5. Easy to determine the **key** points in the development cycle
6. Easy to **classify** and **prioritize** tasks

### Disadvantages
1. The software is ready only **after the last stage is over**
2. **High risks** and **uncertainty**
3. Misses **complexity** due to interdependence of decisions
4. Not suited for **long-term** projects where requirements will change
5. The progress of the stage is **hard to measure** while it is still in the development
6. Integration is done at the very **end**, which does not give the option of identifying the problem in advance

:::warning 答题技巧
优缺点需要知道，时间很紧的话就直接背加粗的关键词，考试的时候根据关键词进行扩写和发挥。考试表达的时候，应该用它适合需求稳定、监管强、文档要求高的项目；不适合需求模糊、用户反馈重要、系统交互复杂的项目这样的表达方式，而不是简单说它不好。
:::

## 1.8 Insulin Pump case

这个案例适合用来考 Waterfall 是否合适。

支持 Waterfall 的理由：它是 safety-critical system（安全关键系统），需要严格 requirements、review、documentation、verification；医疗设备也可能有 regulatory constraints（监管约束）。

反对 Waterfall 的理由：真实用户需求复杂，剂量算法、传感器反馈、用户场景、风险控制可能需要反复验证；如果集成和用户验证太晚，安全风险会被延后发现。

:::info 补充信息
这部分的内容了解即可，不需要背诵，2026年的考题没有涉及，但是你需要掌握在不同的场景下应该用什么方法。
:::

## 模拟考题
1. Why software engineering is so important?
:::details 参考答案
Software Engineering is needed because modern software systems are large, complex and often safety-critical. Software failures are usually caused by problems in requirements, integration, testing, validation and process management rather than simply by bad developers.
:::

2. Explain the difference between verification and validation.
:::details 参考答案
Verification asks whether the system is built correctly according to requirements, constraints and regulations. Validation asks whether the right system has been built for the real needs of customers and stakeholders.
:::

3. Under what conditions is the Waterfall model suitable?
:::details 参考答案
Waterfall is suitable for projects with clear and stable requirements, defined phases, strong documentation needs and regulatory constraints. However, it is less suitable for projects where requirements are uncertain, user feedback is important, or integration risks need to be discovered early.
:::