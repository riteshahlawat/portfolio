import Link from "next/link";

export default function SectionLink({
  text,
  idToScrollTo,
}: {
  text: string;
  idToScrollTo: string;
}) {
  return (
    <Link
      href={`/#${idToScrollTo}`}
      className="group flex w-fit flex-row items-center py-3"
    >
      <div className="mr-4 h-[1px] w-[32px] bg-zinc-500 transition-all duration-200  group-hover:w-[64px] group-hover:bg-zinc-50 " />
      <p className="text-xs font-bold uppercase transition-all group-hover:text-zinc-100">
        {text}
      </p>
    </Link>
  );
}
