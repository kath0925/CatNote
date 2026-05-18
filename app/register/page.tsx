import { SiteHeader } from "@/components/SiteHeader";

export default function RegisterPage() {
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
            Register
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Continue reading CatNote.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">
            第一版暂时不接入真实账号系统。这里先用于测试用户是否愿意为了继续阅读而注册。
          </p>

          <form className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8">
            <label className="block text-sm font-medium text-neutral-700">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="mt-3 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-900"
            />

            <button
              type="button"
              className="mt-6 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
            >
              Register to continue
            </button>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              当前按钮不会真正提交数据。后续会接入 Supabase 登录系统。
            </p>
          </form>
        </section>
      </section>
    </main>
  );
}
