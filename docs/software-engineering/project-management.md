# Project Management

## What it is

Project management in this course is about making software work visible, measurable, and adjustable. It connects Agile planning with lightweight metrics so a team can decide what to build next, estimate effort, track progress, and improve its process.

The lecture separates metrics into two broad groups:

- White-box metrics: measured from the code after implementation.
- Black-box metrics: estimated from requirements or specifications before implementation.

## Why it matters

Without project management, a Kanban board can become only a task list. With estimation, velocity, burn charts, sprint reviews, and retrospectives, the board becomes a planning tool.

For the team project, this matters because markers are not only looking for a playable game. They also want evidence that the team managed uncertainty, coordinated work, responded to feedback, and improved the development process over time.

## Core concepts

### White-box metrics

Lines of Code (LOC) is the most common size metric. It is easy to calculate and easy to understand, but it can be misleading. LOC can show that a module is becoming too large, but it should not be used to judge individual productivity.

Cyclomatic Complexity measures the number of independent paths through code. The formula is:

$$
V(G) = E - N + 2P
$$

Where:

- `E` is the number of edges in the control-flow graph.
- `N` is the number of nodes.
- `P` is the number of connected components.

Higher complexity usually means higher testing and maintenance cost. In a game project, collision handling, input handling, state machines, and level transitions are common places where complexity can grow quickly.

### Black-box metrics

Before code exists, the team estimates effort from requirements. Agile estimation normally uses relative size instead of exact hours.

Story points are informal relative units used to estimate the size or difficulty of user stories. They work best when the whole team discusses them during sprint planning.

Planning Poker uses a sequence such as `1, 3, 5, 8, 13, 20`. Each person estimates privately, the team discusses large differences, then estimates again. The point is to reveal uncertainty and disagreement, not to calculate a perfect number.

Velocity is the number of story points completed in a sprint. A team can average recent sprint velocities to estimate how many points it can realistically take into the next sprint.

Burn charts show remaining work over time. They help the team see whether progress is roughly on track or drifting away from the plan.

### Feedback loops

Sprint Review is where the team demonstrates working software and collects feedback.

Sprint Retrospective is where the team reflects on the process and decides what to improve next.

A practical retrospective format is:

- Keep: what worked and should continue.
- Problem: what slowed the team down.
- Try: what the team will change in the next sprint.

## Example

A simple game input function can become complex if every state is handled with nested conditions:

```js
function handleInput(player, input) {
  if (player.isAlive) {
    if (input.jump && player.onGround) {
      player.jump();
    } else if (input.dash && player.energy > 0) {
      player.dash();
    }
  } else if (input.restart) {
    player.restartLevel();
  }
}
```

This is not automatically bad, but if similar branching spreads across many files, complexity rises. A team should consider splitting state-specific behavior, adding tests for each path, or simplifying the state model.

For Agile planning, a small sprint plan might look like this:

| User story | Points | Priority |
| --- | ---: | --- |
| As a player, I want checkpoints so that I can retry quickly. | 5 | Must |
| As a new player, I want Level 1 to teach jumping safely. | 3 | Must |
| As a player, I want a pause menu so that I can restart or quit. | 3 | Should |
| As a player, I want visual effects when the twist activates. | 8 | Could |

If the team usually completes about 10 points per sprint, taking all 19 points into one sprint is unrealistic.

## Common mistakes

- Using LOC to compare individual contribution.
- Treating story points as exact hours.
- Estimating alone instead of using team discussion.
- Letting Planning Poker run forever instead of limiting rounds.
- Calling a task Done before it is merged, tested, and usable.
- Running a sprint review without working software.
- Writing retrospective notes without turning the Try item into a backlog action.

## Exam angle

If asked about project metrics, separate the answer into white-box and black-box metrics.

White-box metrics are measured from implemented code. LOC is easy to count but can be misleading. Cyclomatic complexity is more useful for identifying functions that may need more testing or refactoring.

Black-box metrics are used before implementation. Story points, Planning Poker, velocity, and burn charts help the team estimate work, plan sprints, and track whether the project is progressing realistically.

If asked about Agile feedback loops, explain the difference between Sprint Review and Sprint Retrospective. Review focuses on the product and external feedback. Retrospective focuses on the team process and continuous improvement.

## Practice

- Explain why LOC is a weak measure of individual productivity.
- What does cyclomatic complexity measure, and why is it useful?
- Explain how Planning Poker supports team estimation.
- What is velocity, and how can it be used in sprint planning?
- What does a burn chart show?
- Compare Sprint Review and Sprint Retrospective.
- Give one practical way a team can turn retrospective findings into backlog actions.
