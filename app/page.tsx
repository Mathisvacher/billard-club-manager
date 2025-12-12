import { ModeToggle } from "@/src/components/theme-toggle";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Lear nextjs</h1>

      <ModeToggle />
    </div>
  );
}
