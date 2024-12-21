import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import { LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const AppSidebar = () => {

  const pathname = usePathname()
  const { user } = useUser()
  const { open } = useSidebar()

  const items = [
    { title: 'My Forms', icon: LibraryBig, url: '/dashboard' },
    { title: 'Responses', icon: MessagesSquare, url: '/' },
    { title: 'Analytics', icon: LineChart, url: '/' },
    { title: 'Upgrade', icon: Shield, url: '/' },
  ]

  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <div className={cn('flex items-center gap-2 transition-all', open && 'p-2')}>
          <UserButton />
          <div className={cn('text-xs', !open && 'hidden')}>
            <p className=" line-clamp-1">{user?.fullName}</p>
            <p className="text-gray-400 line-clamp-1">{user?.emailAddresses?.map(email => email.emailAddress).join(', ')}</p>
          </div>
        </div>
      </SidebarHeader>

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
