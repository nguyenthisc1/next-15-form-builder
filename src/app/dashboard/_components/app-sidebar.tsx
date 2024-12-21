import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { LibraryBig, LineChart, MessagesSquare, Plus, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AppSidebar = () => {
  const pathname = usePathname()
  const { user } = useUser()
  const { open } = useSidebar()

  const items = [
    { title: 'My Forms', icon: LibraryBig, url: '/dashboard' },
    { title: 'Responses', icon: MessagesSquare, url: '/dashboard/responses' },
    { title: 'Analytics', icon: LineChart, url: '/dashboard/analytics' },
    { title: 'Upgrade', icon: Shield, url: '/dashboard/upgrade' },
  ]

  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <div className={cn('flex items-center gap-2 transition-all', open && 'p-2')}>
          <UserButton />
          <div className={cn('text-xs', !open && 'hidden')}>
            <p className='line-clamp-1'>{user?.fullName}</p>
            <p className='line-clamp-1 text-gray-400'>{user?.emailAddresses?.map((email) => email.emailAddress).join(', ')}</p>
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
                    <Link
                      className={cn({
                        '!bg-primary !text-white': pathname === item.url,
                      })}
                      href={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className='px-2 w-full mt-4'>
          <Button className='w-full'>
            <Plus />
            <span>Create Form</span>
          </Button>
          <div className="my-7 space-y-2">
            <Progress value={33} />
            <h2 className='text-sm text-gray-600'><strong>2</strong> Out of 3 File Created</h2>
            <h2 className='text-xs text-gray-600'>Upgrade your plan for unlimited AI</h2>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
