import { notFound } from "next/navigation";
import { noteContents } from "@/data/noteContents";
import type { NoteContentBlock } from "@/data/noteContents";
import { notePreviews } from "@/data/notePreviews";
import { softwareEngineeringNotes } from "@/data/softwareEngineeringNotes";
import { SiteHeader } from "@/components/SiteHeader";

function renderContentBlock(block: NoteContentBlock) {
  if (block.type === "heading") {
    return (
      <h1
        key={block.text}
        className="mb-[8px] text-[15px] font-semibold leading-[24px] text-neutral-900"
      >
        {block.text}
      </h1>
    );
  }

  if (block.type === "subheading") {
    return (
      <h1
        key={block.text}
        className="mt-[20px] mb-[8px] text-[15px] font-semibold leading-[24px] text-neutral-900 first:mt-0"
      >
        {block.text}
      </h1>
    );
  }

  if (block.type === "orderedList") {
    return (
      <ol
        key={block.items.join("|")}
        className="mb-[12px] list-decimal space-y-[6px] pl-5 text-[14px] leading-[24px] text-neutral-700"
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "unorderedList") {
    return (
      <ul
        key={block.items.join("|")}
        className="mb-[12px] list-disc space-y-[6px] pl-5 text-[14px] leading-[24px] text-neutral-700"
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p key={block.text} className="mb-[8px] text-[14px] leading-[24px]">
        {block.text}
      </p>
    );
  }

  return null;
}

export function generateStaticParams() {
  return softwareEngineeringNotes.map((note) => ({
    noteId: note.id,
  }));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;
  const note = softwareEngineeringNotes.find((item) => item.id === noteId);
  const content = noteContents[noteId as keyof typeof noteContents];
  const preview = notePreviews[noteId as keyof typeof notePreviews];

  if (!note) {
    notFound();
  }

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
            Note {note.id} · {note.status}
          </p>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {note.title}
          </h1>

          {note.access === "free" && (
            <article className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
              {content ? (
                <div className="space-y-8">
                  {content.sections.map((section) => (
                    <section key={section.heading}>
                      <h1 className="mb-[12px] text-lg font-semibold leading-[24px] text-neutral-900">
                        {section.heading}
                      </h1>

                      {"blocks" in section ? (
                        <div className="mt-4 space-y-[24px] text-[14px] leading-[24px] text-neutral-700">
                          {section.blocks.map(renderContentBlock)}
                        </div>
                      ) : (
                        <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700">
                          {section.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      )}

                      {"note" in section ? (
                        <p className="mt-3 text-sm leading-6 text-neutral-500">
                          {section.note}
                        </p>
                      ) : null}
                    </section>
                  ))}

                  <iframe
                    src="/notes/introduction.pdf"
                    className="mt-8 h-[800px] w-full rounded-2xl border border-neutral-200"
                    title="Introduction PDF"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-7 text-neutral-700">
                    这里将放置 {note.title} 的正式复习笔记内容。第一版先完成页面结构和访问规则，之后再逐篇填入笔记正文。
                  </p>

                  <div className="mt-8 border-t border-neutral-200 pt-6">
                    <h1 className="text-lg font-semibold">
                      复习结构
                    </h1>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700">
                      <li>核心概念</li>
                      <li>考试重点</li>
                      <li>答题模板</li>
                      <li>练习题</li>
                    </ul>
                  </div>
                </div>
              )}
            </article>
          )}

          {note.access === "register" && (
            <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
              <h1 className="text-lg font-semibold">
                Register to continue reading
              </h1>

              {preview ? (
                <div className="mt-6 rounded-xl bg-neutral-50 p-5">
                  <p className="text-sm font-medium text-neutral-500">
                    Preview
                  </p>

                  <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
                    {preview.preview.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-6 text-sm leading-7 text-neutral-600">
                这篇笔记属于注册后阅读内容。第一版暂时先显示注册提示，后续再接入真实登录系统。
              </p>

              <a
                href="/register"
                className="mt-8 inline-block rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
              >
                Register to unlock
              </a>
            </section>
          )}

          {note.access === "unlock" && (
            <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
              <h1 className="text-lg font-semibold">Unlock this note</h1>

              {preview ? (
                <div className="mt-6 rounded-xl bg-neutral-50 p-5">
                  <p className="text-sm font-medium text-neutral-500">
                    Preview
                  </p>

                  <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
                    {preview.preview.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-6 text-sm leading-7 text-neutral-600">
                这篇笔记需要通过反馈、分享、加入学习群或贡献笔记解锁。第一版先测试用户是否愿意完成这些行为。
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href="/unlock"
                  className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-900"
                >
                  Give feedback
                </a>

                <a
                  href="/unlock"
                  className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-900"
                >
                  Share with a friend
                </a>

                <a
                  href="/unlock"
                  className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-900"
                >
                  Join study group
                </a>

                <a
                  href="/unlock"
                  className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-900"
                >
                  Contribute notes
                </a>
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
