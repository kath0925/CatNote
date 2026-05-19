import { SiteHeader } from "@/components/SiteHeader";

const downloadItems = [
  "Word version of revision notes",
  "PDF version for printing and offline review",
  "Case question pack",
  "Answer template pack",
  "Mock practice pack",
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <SiteHeader
          rightLink={{
            href: "/courses/software-engineering",
            label: "Back to course",
          }}
        />

        <section className="py-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
            Download Pack
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Download the revision pack.
          </h1>

          <p className="mt-6 text-sm leading-[24px] text-neutral-600">
            网页笔记可以免费在线阅读。下载包面向需要离线复习、打印标注、考前快速整理的同学，未来会包含 Word /
            PDF 复习包、案例题、模拟题和英文答题模板。
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-[8px] text-lg font-semibold leading-[24px]">
              What will be included
            </h2>

            <ul className="list-disc space-y-[8px] pl-5 text-sm leading-[24px] text-neutral-700">
              {downloadItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-[8px] text-lg font-semibold leading-[24px]">
              Request access
            </h2>

            <p className="text-sm leading-[24px] text-neutral-600">
              第一版暂时不接支付。你可以先提交访问请求，用来验证是否真的有人需要下载版资料。
            </p>

            <a
              href="mailto:zhulinuk2025@gmail.com?subject=CatNote Download Pack Request"
              className="mt-6 inline-block rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
            >
              Request access
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
