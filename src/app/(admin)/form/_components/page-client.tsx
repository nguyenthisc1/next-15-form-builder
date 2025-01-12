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
            <header className={cn('h-16 shrink-0 gap-2 overflow-hidden p-2 transition-[width,height,transform,padding] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12', preview && 'h-0 -translate-y-full p-0')}>
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
            <div className={cn('h-full')}>
                <div className={cn('h-full space-y-5', !preview && 'rounded-lg border border-sidebar-border')}>
                    <div className='flex items-center justify-between px-2 pt-4'>
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
                    <div className={cn('grid min-h-0 grid-cols-1 gap-4 px-2 transition-[min-height] md:grid-cols-3', preview && 'min-h-[calc(100%-60px)] px-0')}>
                        {!preview && <FormController />}
                        <div className={cn('col-span-2 flex items-stretch', preview && 'col-span-3')}>
                            <FormUI />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageClient
