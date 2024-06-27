import Link from "next/link";

export default function ExternalTextLink({
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
            className="font-bold hover:text-purple-400"
        >
            {children}
        </Link>
    );
}
