import { notFound } from "next/navigation";
import { noteContents } from "@/data/noteContents";
import type { NoteContentBlock } from "@/data/noteContents";
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

                  {note.id === "1" ? (
                    <iframe
                      src="/notes/introduction.pdf"
                      className="mt-8 h-[800px] w-full rounded-2xl border border-neutral-200"
                      title="Introduction PDF"
                    />
                  ) : null}
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-7 text-neutral-700">
                    This note is coming soon.
                  </p>
                </div>
              )}
            </article>
          )}
        </section>
      </section>
    </main>
  );
}
