import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <SiteHeader />

        <div className="flex flex-1 flex-col justify-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
            from zero to freedom
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            课程复习笔记
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">
            CatNote 用英文标题和中文解释，帮助你从零基础理解课程重点、考试概念和答题思路。
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/courses/software-engineering"
              className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
            >
              Start reading for free
            </a>

            <a
              href="/download"
              className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium"
            >
              Download revision pack
            </a>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h2 className="text-lg font-semibold">Free online notes</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                在线复习笔记免费阅读，先快速理解课程重点。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h2 className="text-lg font-semibold">Download pack</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Word / PDF 版本适合离线复习、打印和考前整理。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h2 className="text-lg font-semibold">Exam practice</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                下载包未来会包含案例题、模拟题和英文答题模板。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
