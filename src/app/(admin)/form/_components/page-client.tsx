/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import FormController from '@/app/(admin)/form/_components/form-controller'
import FormUI from '@/app/(admin)/form/_components/form-ui'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import { ChevronLeft, Edit, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PageClient = () => {
    const router = useRouter()
    const { preview, setPreview } = useSidebar()

    const handleSwitchStatusForm = () => {
        setPreview(!preview)
    }

    return (
        <>
            <header className={cn('h-16 shrink-0 gap-2 p-2 transition-[width,height,transform,padding] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 overflow-hidden', preview && '-translate-y-full h-0  p-0')}>
                <div className='flex size-full items-center rounded-lg border border-sidebar-border'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Form</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </header>
            <div className={cn('h-full', !preview && 'p-2')}>
                <div className='h-full space-y-5 rounded-lg border border-sidebar-border p-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex cursor-pointer items-center gap-2' onClick={() => router.back()}>
                            <ChevronLeft />
                            <span>Back</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Button onClick={handleSwitchStatusForm}>
                                {preview ? (
                                    <>
                                        <Edit /> Edit
                                    </>
                                ) : (
                                    <>
                                        <SquareArrowOutUpRight /> Live Preview
                                    </>
                                )}
                            </Button>

                            <Button className='bg-success'>
                                <Share2 /> Share
                            </Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {!preview && <FormController />}
                        <div className={cn('col-span-2', preview && 'col-span-3')}>
                            <FormUI />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageClient
