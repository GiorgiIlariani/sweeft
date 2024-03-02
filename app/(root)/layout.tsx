import Header from "@/components/shared/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <Header />
      {children}
    </main>
  );
}
