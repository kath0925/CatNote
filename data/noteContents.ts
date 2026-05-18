export type NoteContentBlock =
  | {
      type: "heading" | "subheading" | "paragraph";
      text: string;
    }
  | {
      type: "orderedList" | "unorderedList";
      items: readonly string[];
    };

type NoteContentSection =
  | {
      heading: string;
      body: readonly string[];
      note?: string;
    }
  | {
      heading: string;
      blocks: readonly NoteContentBlock[];
      note?: string;
    };

type NoteContent = {
  title: string;
  sections: readonly NoteContentSection[];
};

export const noteContents = {
  "1": {
    title: "Introduction",
    sections: [
      {
        heading: "复习资料",
        blocks: [
          {
            type: "heading",
            text: "Software Crisis",
          },
          {
            type: "paragraph",
            text: "Software Crisis（软件危机）指的是：随着软件规模越来越大、复杂度越来越高，传统“靠程序员直接写代码”的方式越来越难保证项目按时、按预算、按质量交付，导致大量软件项目失败或产生严重后果。",
          },
          {
            type: "paragraph",
            text: "Lecture 1 明确提到原因包括：software is getting larger and larger、more complex、涉及复杂领域如 human behaviours、energy and cars，系统依赖更强，同时 time to market 更短。",
          },
          {
            type: "subheading",
            text: "Why Do Software Projects Fail?",
          },
          {
            type: "paragraph",
            text: "课程用 Ariane 5、Mars Climate Orbiter、Therac-25 说明：软件失败往往不是单个程序员粗心，而是 requirements、integration、testing、reuse、safety validation 和 process management 出了系统性问题。",
          },
          {
            type: "paragraph",
            text: "Bad developers – not the main problem!",
          },
          {
            type: "orderedList",
            items: [
              "Over budget",
              "Poor requirements",
              "Over-ambitious requirements",
              "Unnecessary requirements",
              "Contract management",
              "End-user training",
              "Operational management",
            ],
          },
          {
            type: "paragraph",
            text: "考试中要把失败归因到 system/process level（系统/过程层面），不要归因到“程序员不努力”。",
          },
          {
            type: "heading",
            text: "Software Engineering",
          },
          {
            type: "paragraph",
            text: "Engineering: cost-effective solutions to practical problems by applying scientific knowledge to building things for people.",
          },
          {
            type: "paragraph",
            text: "课程的定义可以拆成四部分：",
          },
          {
            type: "orderedList",
            items: [
              "cost-effective solutions（成本有效的解决方案）",
              "practical problems（现实问题）",
              "scientific knowledge（科学知识，如 modelling、proofs、testing、simulation、patterns）",
              "building things for people（为客户和最终用户构建软件）",
            ],
          },
          {
            type: "subheading",
            text: "SDLC: Software Development Life Cycle",
          },
          {
            type: "paragraph",
            text: "SDLC 关心的是哪些任务要做、按什么顺序做。",
          },
          {
            type: "paragraph",
            text: "基本任务：Requirements Analysis（需求分析）、Planning（计划）、Design（设计）、Development（开发）、Testing（测试）、Deployment（部署）、Operation and Maintenance（运营与维护）。",
          },
          {
            type: "paragraph",
            text: "SDLC",
          },
          {
            type: "subheading",
            text: "SDLC: Examples",
          },
          {
            type: "paragraph",
            text: "Waterfall、Agile、V-Model、Spiral 都是不同的 SDLC process（生命周期过程）安排。",
          },
          {
            type: "heading",
            text: "Verification vs Validation",
          },
          {
            type: "paragraph",
            text: "高频考点。",
          },
          {
            type: "paragraph",
            text: "Verification 是 “Are you building it right?”，即检查系统是否符合 requirements、constraints、regulations，关注是否按规格正确构建。",
          },
          {
            type: "paragraph",
            text: "Validation 是 “Are you building the right thing?”，即检查系统是否真正满足 customers/stakeholders 的需要。",
          },
          {
            type: "paragraph",
            text: "注意区分：一个系统可能 pass verification but fail validation（通过验证但确认失败），因为它完全按规格实现，但规格本身没有解决用户真实问题。",
          },
          {
            type: "heading",
            text: "Waterfall",
          },
          {
            type: "paragraph",
            text: "考试表达的时候，应该用它适合需求稳定、监管强、文档要求高的项目；不适合需求模糊、用户反馈重要、系统交互复杂的项目这样的表达方式，而不是简单说它不好。",
          },
          {
            type: "subheading",
            text: "Advantages",
          },
          {
            type: "orderedList",
            items: [
              "Simple to use and understand",
              "Every phase has a defined result and process review",
              "Development stages go one by one",
              "Perfect for projects where requirements are clear and agreed upon",
              "Easy to determine the key points in the development cycle",
              "Easy to classify and prioritize tasks",
            ],
          },
          {
            type: "subheading",
            text: "Disadvantages",
          },
          {
            type: "orderedList",
            items: [
              "The software is ready only after the last stage is over",
              "High risks and uncertainty",
              "Misses complexity due to interdependence of decisions",
              "Not suited for long-term projects where requirements will change",
              "The progress of the stage is hard to measure while it is still in the development",
              "Integration is done at the very end, which does not give the option of identifying the problem in advance",
            ],
          },
          {
            type: "heading",
            text: "Insulin Pump case",
          },
          {
            type: "paragraph",
            text: "这个案例适合用来考 Waterfall 是否合适。",
          },
          {
            type: "paragraph",
            text: "支持 Waterfall 的理由：它是 safety-critical system（安全关键系统），需要严格 requirements、review、documentation、verification；医疗设备也可能有 regulatory constraints（监管约束）。",
          },
          {
            type: "paragraph",
            text: "反对 Waterfall 的理由：真实用户需求复杂，剂量算法、传感器反馈、用户场景、风险控制可能需要反复验证；如果集成和用户验证太晚，安全风险会被延后发现。",
          },
        ],
      },
      {
        heading: "必背重点",
        body: [
          "Software Crisis 的根本问题是软件规模、复杂度、依赖关系和交付压力增长，传统直接写代码的方法不够可靠。",
          "项目失败要从 system/process level 分析，例如 poor requirements、integration、testing、contract management、end-user training 和 operational management。",
          "Software Engineering 强调 cost-effective、practical problems、scientific knowledge 和 building things for people。",
          "SDLC 包括 requirements analysis、planning、design、development、testing、deployment、operation and maintenance。",
          "Verification = building it right；Validation = building the right thing。",
          "Waterfall 适合 requirements 稳定、阶段明确、监管或文档要求强的项目；不适合 requirements 会变、用户反馈重要、复杂度和不确定性高的项目。",
        ],
      },
      {
        heading: "答题模板",
        body: [
          "Software Engineering is needed because modern software systems are large, complex and often safety-critical. Software failures are usually caused by problems in requirements, integration, testing, validation and process management rather than simply by bad developers.",
          "Verification asks whether the system is built correctly according to requirements, constraints and regulations. Validation asks whether the right system has been built for the real needs of customers and stakeholders.",
          "Waterfall is suitable for projects with clear and stable requirements, defined phases, strong documentation needs and regulatory constraints. However, it is less suitable for projects where requirements are uncertain, user feedback is important, or integration risks need to be discovered early.",
        ],
        note: "答题时不要只背定义，要把概念和项目失败、真实约束、用户需求或安全风险联系起来。",
      },
      {
        heading: "模拟考题",
        body: [
          "Explain what is meant by the software crisis.",
          "Why do software projects fail? Give examples beyond bad developers.",
          "Explain the difference between verification and validation.",
          "Under what conditions is the Waterfall model suitable?",
          "Discuss whether Waterfall is appropriate for a safety-critical system such as an insulin pump.",
        ],
      },
    ],
  },
  "2": {
    title: "Agile Software Development",
    sections: [
      {
        heading: "复习资料",
        blocks: [
          {
            type: "heading",
            text: "Agile Manifesto",
          },
          {
            type: "paragraph",
            text: "敏捷宣言：",
          },
          {
            type: "orderedList",
            items: [
              "Individuals and interactions over processes and tools",
              "Working software over comprehensive documentation",
              "Customer collaboration over contract negotiation",
              "Responding to change over following a plan",
            ],
          },
          {
            type: "heading",
            text: "Extreme Programming / XP",
          },
          {
            type: "paragraph",
            text: "Extreme Programming / XP（极限编程）",
          },
          {
            type: "subheading",
            text: "XP Ethos",
          },
          {
            type: "paragraph",
            text: "极限编程基本理念：",
          },
          {
            type: "orderedList",
            items: [
              "Simple design: use the simplest way to implement features 简单设计",
              "Sustainable pace: effort is constant and manageable 可持续的工作",
              "Coding standards: teams follow an agreed style and format 编码标准",
              "Collective ownership: everyone owns all the code 集体所有权",
              "Whole team approach: everyone is included in everything 整体的团队方法",
            ],
          },
          {
            type: "subheading",
            text: "XP Practices",
          },
          {
            type: "paragraph",
            text: "极限编程对应的实践：",
          },
          {
            type: "orderedList",
            items: [
              "Pair programming: two heads are better than one 结对编程",
              "Test driven: ensure the code runs correctly 测试驱动",
              "Small releases: deliver frequently and get feedback from the client 小版本",
              "Continuous integration: ensure the system is operational 持续集成",
              "Refactor: restructure the system when things get messy 重构",
            ],
          },
          {
            type: "subheading",
            text: "Pair programming",
          },
          {
            type: "paragraph",
            text: "结对编程要记住两个角色：helm（掌舵者，实际敲键盘）和 tactician（策略者，思考风险、设计影响和重构机会）。",
          },
          {
            type: "paragraph",
            text: "它不是“两个人分开写两份代码”，而是一台机器、同步讨论、边写边 review。",
          },
          {
            type: "heading",
            text: "Test-driven development",
          },
          {
            type: "paragraph",
            text: "TDD (Test-driven development)：测试驱动开发：逻辑是先写 tests（测试），再写刚好通过测试的代码；如果没有测试支持，这个 feature（功能）原则上不应被实现。",
          },
          {
            type: "subheading",
            text: "Benefits",
          },
          {
            type: "orderedList",
            items: [
              "code coverage代码覆盖",
              "simplified debugging简化调试",
              "并让测试本身成为 system documentation（系统文档）的一部分",
            ],
          },
          {
            type: "heading",
            text: "Scrum",
          },
          {
            type: "paragraph",
            text: "敏捷项目管理框架要记住角色和事件：",
          },
          {
            type: "subheading",
            text: "Roles",
          },
          {
            type: "unorderedList",
            items: [
              "Product Owner（产品负责人）负责愿景和 backlog（待办列表）优先级；",
              "Scrum Master（敏捷教练/流程负责人）负责移除障碍和维护流程；",
              "Developers（开发团队）负责实现、测试、交付。",
            ],
          },
          {
            type: "subheading",
            text: "Events",
          },
          {
            type: "paragraph",
            text: "Sprint（冲刺）是短周期开发迭代，daily scrum / stand-up（每日站会）用于同步进展；",
          },
          {
            type: "paragraph",
            text: "Kanban（看板）核心是把工作从 To Do 到 Done 可视化，常见列包括 To Do、In Progress、Done，也可以按团队需要增加 Backlog、Being Verified、Awaiting Integration，但必须有 Done。",
          },
          {
            type: "heading",
            text: "Problems with Agile",
          },
          {
            type: "paragraph",
            text: "Agile 的局限：",
          },
          {
            type: "orderedList",
            items: [
              "完整规格不会一开始全部写死，所以法律合同较难制定；",
              "适合 green-field development（新系统从零开始），但对 brownfield development（维护旧系统）不一定理想；",
              "小型 co-located team（同地小团队）效果较好，但 large distributed development（大型分布式团队）会更难；",
              "依赖团队成员知识，如果人员离开，风险会上升。",
            ],
          },
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
        blocks: [
          {
            type: "subheading",
            text: "Requirements",
          },
          {
            type: "paragraph",
            text: "Requirements（需求）描述系统应该做什么，以及系统必须满足哪些限制条件。System requirements specify a system, not in terms of system implementation, but in terms of user observation. Requirements record description of the system features and constraints.",
          },
          {
            type: "subheading",
            text: "Functional requirements",
          },
          {
            type: "paragraph",
            text: "功能性需求：说明系统应该做什么，例如提供哪些服务、如何响应输入、在特定场景下如何行为，系统不应该做什么。",
          },
          {
            type: "orderedList",
            items: [
              "Statements of services the system should provide",
              "How the system should react to particular inputs",
              "How the system should behave in particular situations",
              "May also state what the system should NOT do",
            ],
          },
          {
            type: "subheading",
            text: "Non-functional requirements",
          },
          {
            type: "paragraph",
            text: "非功能性需求：说明系统如何实现这些功能，如安全性、可用性、响应时间、可访问性等，通常作用于整个系统而非单个功能。",
          },
          {
            type: "paragraph",
            text: "Non-functional requirements are constraints on the services or functions offered by the system, and often apply to the whole system rather than individual features.",
          },
          {
            type: "subheading",
            text: "Why Requirements Engineering matters",
          },
          {
            type: "paragraph",
            text: "真实项目里常见问题包括：不同人用词不一致、需求冲突、用户自己说不清想要什么、需求经常变化、关键人员或信息不容易获得。",
          },
          {
            type: "subheading",
            text: "Acceptance criteria",
          },
          {
            type: "paragraph",
            text: "好的 requirements 必须能变成 acceptance criteria。所以需求要满足 unambiguous / precise（无歧义、精确）、measurable（可测量）、understandable / clear（清楚易懂）。",
          },
          {
            type: "subheading",
            text: "需求分析路径",
          },
          {
            type: "orderedList",
            items: [
              "Identify stakeholders",
              "Identify top-level needs",
              "Break down into user stories",
              "Write atomic requirements / acceptance criteria",
              "Use UML use case to express functional behaviour",
            ],
          },
          {
            type: "subheading",
            text: "Stakeholder",
          },
          {
            type: "paragraph",
            text: "Stakeholder（利益相关者）不只是用户，还可以包括客户、系统管理员、测试者、开发者、业务分析师、法律/监管代表、surrogate stakeholders，甚至 negative stakeholders。",
          },
          {
            type: "subheading",
            text: "Agile requirements",
          },
          {
            type: "paragraph",
            text: "Agile requirements 的层级是 Initiative → Epic → User Story。Initiative 是战略目标；Epic 是大的用户或业务目标，通常跨多个 sprint；User Story 是一个 sprint 内能完成的具体功能。",
          },
          {
            type: "paragraph",
            text: "User Story 标准格式：As a <type of user>, I want to <goal> so that <reason>.",
          },
          {
            type: "subheading",
            text: "INVEST",
          },
          {
            type: "orderedList",
            items: [
              "Independent",
              "Negotiable",
              "Valuable",
              "Estimable",
              "Small",
              "Testable",
            ],
          },
          {
            type: "paragraph",
            text: "INVEST 用来判断 user story 是否质量足够好。",
          },
          {
            type: "subheading",
            text: "Acceptance Criteria",
          },
          {
            type: "paragraph",
            text: "Acceptance Criteria 要 Clear、Testable、Measurable、Atomic。Given-When-Then 模板是：Given <initial context or precondition>, when <action or event>, then <expected outcome>.",
          },
          {
            type: "subheading",
            text: "Prioritisation",
          },
          {
            type: "paragraph",
            text: "Prioritisation（优先级排序）主要看 user needs、business value 和 technical considerations。常用方法包括 MoSCoW 和 Value vs Effort。",
          },
          {
            type: "subheading",
            text: "MoSCoW",
          },
          {
            type: "orderedList",
            items: [
              "Must-Have: essential",
              "Should-Have: important",
              "Could-Have: nice to have",
              "Won’t-Have: out of scope at present",
            ],
          },
          {
            type: "subheading",
            text: "Value vs Effort",
          },
          {
            type: "orderedList",
            items: [
              "High value, Low effort: 优先做",
              "High value, High effort: 后做",
              "Low value, Low effort: 有时间再做",
              "Low value, High effort: 避免",
            ],
          },
          {
            type: "heading",
            text: "UML Use Case",
          },
          {
            type: "paragraph",
            text: "UML Use Case（用例）部分要掌握 actor、use case、association、use-case diagram、use-case specification。Actor 是系统外部与系统交互的角色，可以是人、机器或另一个系统。Use case 是系统执行的一系列动作，给某个 actor 产生可观察的价值结果。",
          },
          {
            type: "subheading",
            text: "Use-case diagram",
          },
          {
            type: "paragraph",
            text: "Use-case diagram 显示 actors、use cases 和它们的关系，定义系统边界，说明谁和系统交互、系统提供哪些行为。",
          },
          {
            type: "subheading",
            text: "Use-case specification",
          },
          {
            type: "paragraph",
            text: "Use-case specification 是文字版本，通常包括 use case name、brief description、basic flow、alternative flows、preconditions、postconditions、special requirements。Basic flow 是成功主路径；alternative flows 包括正常变体、特殊情况和错误流程。",
          },
        ],
      },
      {
        heading: "必背重点",
        body: [
          "Functional requirements 关注系统做什么；Non-functional requirements 关注系统做得怎么样。",
          "Requirements Engineering 的核心价值是减少歧义、冲突、遗漏和变化带来的风险。",
          "好的 requirement 应该 clear、measurable、testable、unambiguous。",
          "Agile requirements 层级：Initiative → Epic → User Story。",
          "User Story 格式：As a user, I want a goal, so that I get value。",
          "INVEST 用来判断 user story 质量。",
          "Acceptance Criteria 要 Clear、Testable、Measurable、Atomic。",
          "MoSCoW 用来做需求优先级排序。",
          "Use case 从 actor 目标出发描述系统交互，不是普通功能列表。",
        ],
      },
      {
        heading: "答题模板",
        body: [
          "Functional requirements describe what the system should do, such as the services it provides and how it responds to inputs. Non-functional requirements describe constraints or quality attributes of the system, such as performance, usability, security and reliability.",
          "Requirements Engineering is important because stakeholders may use inconsistent terminology, have conflicting needs, or be unable to explain what they want clearly. Requirements may also change frequently. A systematic requirements process helps reduce ambiguity and supports design, implementation and testing.",
          "A good user story should follow INVEST: it should be independent, negotiable, valuable, estimable, small and testable. This helps ensure that the story can be understood, planned and completed within an iteration.",
          "A use case describes how an external actor interacts with the system to achieve a goal. It helps define the system boundary, expected behaviour and value delivered to the actor.",
        ],
      },
      {
        heading: "模拟考题",
        body: [
          "Explain the difference between functional and non-functional requirements.",
          "Why is Requirements Engineering important in software development?",
          "What are the qualities of good acceptance criteria?",
          "Explain the INVEST criteria for good user stories.",
          "Define actor and use case in a UML use-case model.",
          "Explain how MoSCoW can be used to prioritise requirements.",
        ],
      },
    ],
  },
} as const satisfies Record<string, NoteContent>;
