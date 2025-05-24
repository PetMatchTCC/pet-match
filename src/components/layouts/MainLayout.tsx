import AppSidebar from "../custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="m-2 size-8 sm:relative absolute" />
      <main className="flex flex-col w-full items-center ">{children}</main>
      <Toaster position="bottom-right" />
    </SidebarProvider>
  );
};

export default MainLayout;
