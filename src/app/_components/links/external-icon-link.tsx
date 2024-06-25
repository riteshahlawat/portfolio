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
      className="w-fit font-light text-zinc-500 transition-colors duration-200  hover:text-zinc-50"
    >
      {children}
    </Link>
  );
}
