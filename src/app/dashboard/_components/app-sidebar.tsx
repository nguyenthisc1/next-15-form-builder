import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const AppSidebar = () => {

  const pathname = usePathname()
  console.log("🚀 ~ AppSidebar ~ pathname:", pathname)

  const items = [
    { title: 'My Forms', icon: LibraryBig, url: '/dashboard' },
    { title: 'Responses', icon: MessagesSquare, url: '/' },
    { title: 'Analytics', icon: LineChart, url: '/' },
    { title: 'Upgrade', icon: Shield, url: '/' },
  ]

  return (
    <Sidebar collapsible='icon' variant='floating'>
      {/* <SidebarHeader /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className={cn({
                      '!bg-primary !text-white': pathname === item.url,
                    })} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  )
}

export default AppSidebar
