import { cn } from "@/lib/utils";

export default function SectionDivider({
  sectionName,
  className,
}: {
  sectionName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky top-0 z-[1] my-2 block w-full bg-zinc-900 py-3 text-zinc-200 md:hidden",
        className,
      )}
    >
      <p className="text-lg font-bold uppercase">{sectionName}</p>
    </div>
  );
}
