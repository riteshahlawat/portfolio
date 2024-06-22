export default function Code({ children }: { children?: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-zinc-700 px-1 py-[2px]">{children}</code>
  );
}
