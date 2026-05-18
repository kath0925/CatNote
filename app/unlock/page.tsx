import { SiteHeader } from "@/src/components/SiteHeader";

const unlockOptions = [
  "Give feedback",
  "Share with a friend",
  "Join study group",
  "Contribute notes",
];

export default function UnlockPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <SiteHeader
          rightLink={{
            href: "/courses/software-engineering",
            label: "Back to course",
          }}
        />

        <section className="py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
            Unlock
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            Unlock more revision notes.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            第 6 篇之后的内容暂时不设置付费入口。你可以通过反馈、分享、加入学习群或贡献笔记来解锁更多内容。
          </p>

          <div className="mt-10 grid gap-4">
            {unlockOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left text-lg font-medium transition hover:border-neutral-900"
              >
                {option}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-neutral-500">
            当前按钮不会真正提交数据。第一版先验证用户更愿意选择哪种解锁方式。
          </p>
        </section>
      </section>
    </main>
  );
}
