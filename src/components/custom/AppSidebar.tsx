import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bell,
  Home,
  LogOut,
  Send,
  Settings,
  ShieldBan,
  UserCircle,
} from "lucide-react";

const AppSidebar = () => {
  const { logout } = useAuth();
  const items = [
    {
      title: "Início",
      url: "/feed",
      icon: Home,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: Send,
    },
    {
      title: "Notificações",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Reportar",
      url: "/report",
      icon: ShieldBan,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PetMatch</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/me">
                <UserCircle />
                <span>Meu Perfil</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
