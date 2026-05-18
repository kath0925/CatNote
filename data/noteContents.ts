export const noteContents = {
  "1": {
    title: "Introduction",
    sections: [
      {
        heading: "课程概览",
        body: [
          "Software Engineering Discipline and Practice 这门课主要讲：软件不是只靠写代码完成的，而是需要经过需求分析、设计、项目管理、用户体验评估、质量测试、可持续性和隐私保护等一整套工程化过程。",
          "这门课的核心目标是让你理解：一个软件系统从想法到交付，不只是 implementation（实现），还包括 requirements（需求）、design（设计）、testing（测试）、management（管理）、evaluation（评估）和 maintenance（维护）。",
        ],
      },
      {
        heading: "这门课考什么",
        body: [
          "考试重点通常不是死记某个定义，而是考你能不能比较不同方法、解释概念的作用，并把它们应用到具体场景中。",
          "常见考法包括：比较 Agile 和 Waterfall、解释 requirements 的质量、识别 use case / actor、画或分析 UML、理解 project management、解释 HCI evaluation、区分 testing 方法、说明 sustainability / privacy 的设计原则。",
        ],
      },
      {
        heading: "复习路线",
        body: [
          "建议按课程顺序复习：先理解 Software Engineering 和 Agile，再看 Requirements，然后进入 Object-Oriented Design 和 Project Management，最后复习 HCI Evaluation、Testing、Sustainability 和 Privacy。",
          "前半部分偏软件开发过程和设计，后半部分偏评估、质量和责任。复习时不要孤立背概念，要一直思考：这个概念解决了软件开发中的什么问题？",
        ],
      },
      {
        heading: "使用方法",
        body: [
          "每篇正式笔记会按照“复习资料、必背重点、答题模板、模拟考题”组织。你应该先读复习资料理解概念，再背必背重点，最后用答题模板和模拟考题训练考试表达。",
          "如果时间很紧，优先看每篇的“必背重点”和“答题模板”。如果想拿更高分，需要理解每个概念背后的动机和适用场景。",
        ],
      },
    ],
  },
  "2": {
    title: "Agile Software Development",
    sections: [
      {
        heading: "复习资料",
        body: [
          "Agile Software Development（敏捷软件开发）的核心不是“没有计划”，而是通过短周期迭代、持续反馈和可工作的软件来应对需求变化。",
          "Waterfall（瀑布模型）通常是顺序式开发：先完成 requirements，再 design，再 implementation，再 testing，最后 deployment。它更适合需求稳定、变更较少、流程明确的项目。",
          "Agile（敏捷）更适合需求不完全明确、用户反馈重要、变化频繁的项目。它强调 working software、customer collaboration、responding to change 和 iterative development。",
          "Iteration / Sprint（迭代）：一个较短的开发周期，团队在周期内完成一部分可交付功能。",
          "Working software（可工作的软件）：Agile 更重视能运行、能被用户验证的软件，而不是只依赖大量文档。",
          "Customer collaboration（客户协作）：开发过程中持续和客户或用户沟通，而不是只在项目开始时确定需求。",
          "Responding to change（响应变化）：当需求发生变化时，Agile 倾向于调整计划，而不是强行坚持原计划。",
        ],
      },
      {
        heading: "必背重点",
        body: [
          "Agile 和 Waterfall 的核心区别：Waterfall 是 sequential（顺序式）的，Agile 是 iterative（迭代式）的。",
          "Waterfall 通常依赖 upfront requirements（前期完整需求），Agile 接受 requirements may change（需求可能变化）。",
          "Agile 通过 sprint、working software、customer feedback 和 continuous improvement 来降低需求不确定性带来的风险。",
          "答题时不要只写 Agile is flexible。必须说明它是如何 flexible 的：通过短周期迭代、频繁反馈、持续交付和客户协作。",
        ],
      },
      {
        heading: "答题模板",
        body: [
          "Agile software development is an iterative approach that delivers working software in small increments. Unlike Waterfall, which follows a sequential process with most requirements defined upfront, Agile accepts that requirements may change. It uses short iterations, customer collaboration and regular feedback to adapt the product during development. This makes Agile suitable for projects with uncertain or changing requirements.",
        ],
        note: "如果题目要求 compare Agile and Waterfall，必须同时写两者差异，不要只解释 Agile。",
      },
      {
        heading: "模拟考题",
        body: [
          "Compare Agile software development with the Waterfall model.",
          "Explain why Agile is suitable for projects with changing requirements.",
          "Give one advantage and one disadvantage of Agile software development.",
        ],
      },
    ],
  },
  "3": {
    title: "Requirements",
    sections: [
      {
        heading: "复习资料",
        body: [
          "Requirements（需求）描述系统应该做什么，以及系统必须满足哪些限制条件。它们是软件开发的起点，因为后续 design、implementation 和 testing 都依赖需求是否清楚。",
          "Functional requirements（功能需求）描述系统应该提供什么功能，例如用户可以注册账号、提交订单、搜索课程笔记。",
          "Non-functional requirements（非功能需求）描述系统应该如何表现，例如性能、安全性、可用性、可靠性、可维护性。",
          "Actor（参与者）是系统外部与系统交互的人、组织或其他系统。Actor 不一定是具体某个人，而是一个 role（角色）。",
          "Use case（用例）描述某个 actor 为了达成一个目标而与系统发生的一组交互。",
          "Use case model（用例模型）通常包括 use case diagram 和 use case specification，用来帮助团队理解系统边界、用户目标和主要功能。",
        ],
      },
      {
        heading: "必背重点",
        body: [
          "Requirements 的作用是把用户需要和系统行为明确下来，避免团队开发错误功能。",
          "好的 requirements 应该清楚、可测试、一致、完整，并且与用户目标相关。",
          "Functional requirements 关注系统做什么；non-functional requirements 关注系统做得怎么样。",
          "Actor 是系统外部的角色，不是系统内部组件。",
          "Use case 不是一个普通功能列表，而是从 actor 目标出发描述系统交互。",
          "需求不清楚会导致 scope creep、返工、测试困难和项目失败。",
        ],
      },
      {
        heading: "答题模板",
        body: [
          "Requirements describe what a system should do and the constraints it must satisfy. Functional requirements specify the services or behaviours provided by the system, while non-functional requirements describe quality attributes such as performance, usability, security and reliability. Clear requirements are important because they guide design, implementation and testing, and reduce the risk of building the wrong system.",
          "A use case describes an interaction between an external actor and the system in order to achieve a specific goal. It helps developers understand user goals, system boundaries and expected behaviour.",
        ],
        note: "如果题目问 requirements quality，优先写 clear、testable、consistent、complete；如果题目问 use case，优先写 actor、goal、system interaction。",
      },
      {
        heading: "模拟考题",
        body: [
          "Explain the difference between functional and non-functional requirements.",
          "What makes a requirement good quality?",
          "Define actor and use case in a use case model.",
          "Why are requirements important in software engineering?",
        ],
      },
    ],
  },
} as const;
