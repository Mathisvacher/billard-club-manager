import Sidebar from "@/src/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh bg-background-grey overflow-hidden">
      <div className="flex flex-col h-full gap-3 p-3">
        <div className="flex flex-1 gap-3 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
