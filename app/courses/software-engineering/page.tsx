import { softwareEngineeringNotes } from "@/data/softwareEngineeringNotes";
import { SiteHeader } from "@/src/components/SiteHeader";

export default function SoftwareEngineeringPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <SiteHeader />

        <section className="py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
            Software Engineering Discipline and Practice
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
            Course Notes
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            按课程文件顺序整理的复习笔记。前 3 篇免费阅读，第 4–5 篇注册后阅读，第 6 篇之后通过反馈、分享、加群或贡献笔记解锁。
          </p>
        </section>

        <section className="grid gap-4">
          {softwareEngineeringNotes.map((note, index) => (
            <a
              key={note.title}
              href={`/courses/software-engineering/notes/${index + 1}`}
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
            >
              <div>
                <p className="text-sm text-neutral-500">
                  Note {index + 1}
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  {note.title}
                </h2>
              </div>

              <span className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-600">
                {note.status}
              </span>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
