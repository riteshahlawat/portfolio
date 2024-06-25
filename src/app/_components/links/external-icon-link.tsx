import Link from "next/link";

export default function ExternalIconLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="w-fit rounded-md border border-zinc-700 border-opacity-0 p-[4px] font-light text-zinc-500 transition-all duration-200 hover:border-opacity-80 hover:text-zinc-50"
    >
      {children}
    </Link>
  );
}
