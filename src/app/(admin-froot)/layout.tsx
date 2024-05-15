import { SideBar } from "./_components/side-bar";
import Header from "./_components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* SideBar Menu */}
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* Header */}
        <Header/>
        
        {/* Pages Data below */}
        {children}
      </div>
    </div>
  );
}
