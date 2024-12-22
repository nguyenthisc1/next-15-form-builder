import CreateForm from '@/app/(admin)/dashboard/_components/create-form'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'

const DashboardPage = () => {
    return (
        <>
            <header className='h-16 shrink-0 gap-2 p-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                <div className='flex size-full items-center rounded-lg border border-sidebar-border'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink>Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </header>
            <div className='h-full p-2'>
                <div className='h-full space-y-5 rounded-lg border border-sidebar-border p-4'>
                    <div className='flex justify-end'>
                        <CreateForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
