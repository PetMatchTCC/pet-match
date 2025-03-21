import AppSidebar from "../custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="m-2 size-8" />
      <main className="flex flex-col w-full items-center ">{children}</main>
    </SidebarProvider>
  );
};

export default MainLayout;
