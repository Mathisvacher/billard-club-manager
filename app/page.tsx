import { ModeToggle } from "@/src/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Lear nextjs</h1>

      <Link href={"/formations"}> Plan de formation</Link>
      <ModeToggle />
    </div>
  );
}
