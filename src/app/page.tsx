import TLDRSticky from "./_components/page-components/tldr-sticky";
import MainContent from "./_components/page-components/main-content";
import Spotlight from "./_components/spotlight";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-zinc-900 py-16 text-zinc-400 selection:bg-[#6140f5c9]">
      <div className="container mx-auto flex w-full flex-row gap-4">
        <Spotlight />
        <TLDRSticky />
        <MainContent />
      </div>
    </main>
  );
}
