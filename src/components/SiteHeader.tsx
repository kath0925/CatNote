import Link from "next/link";

type SiteHeaderProps = {
  rightLink?: {
    href: string;
    label: string;
  };
};

export function SiteHeader({ rightLink }: SiteHeaderProps) {
  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">
        CatNote
      </Link>

      {rightLink ? (
        <Link
          href={rightLink.href}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          {rightLink.label}
        </Link>
      ) : (
        <div className="text-sm text-neutral-500">中文 | EN</div>
      )}
    </nav>
  );
}
