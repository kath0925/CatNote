import { softwareEngineeringNotes } from "@/data/softwareEngineeringNotes";
import NoteStatusBadge from "@/components/NoteStatusBadge";
import { SiteHeader } from "@/components/SiteHeader";

export default function SoftwareEngineeringPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <SiteHeader />

        <section className="py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
            Software Engineering Discipline and Practice
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight">
            Course Notes
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">
            按课程文件顺序整理的复习笔记。网页笔记免费在线阅读，下载包用于离线复习、打印标注和考前快速整理。
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="mb-[8px] text-sm font-medium uppercase tracking-wide text-neutral-500">
            Offline revision
          </p>

          <h2 className="mb-[8px] text-lg font-semibold leading-[24px]">
            Want a printable revision pack?
          </h2>

          <p className="text-sm leading-[24px] text-neutral-600">
            网页笔记可以免费在线阅读。如果你想离线复习、打印标注或考前快速整理，可以申请下载 Word /
            PDF 复习包、案例题包和英文答题模板。
          </p>

          <a
            href="/download"
            className="mt-6 inline-block rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
          >
            View download pack
          </a>
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
                <h2 className="mt-1 text-lg font-semibold">
                  {note.title}
                </h2>
              </div>

              <NoteStatusBadge status={note.status} />
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
