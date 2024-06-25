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
        "sticky top-0 block w-full bg-zinc-900 bg-opacity-80 py-2 text-zinc-200 backdrop-blur-[3px] md:hidden",
        className,
      )}
    >
      <p className="text-lg font-bold uppercase">{sectionName}</p>
    </div>
  );
}
