/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import FormController from '@/app/(admin)/form/_components/form-controller'
import FormUI from '@/app/(admin)/form/_components/form-ui'
import { useFormContext } from '@/app/(admin)/form/provider/form-context'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { ChevronLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PageClient = () => {
    const router = useRouter()
    const { state } = useFormContext()

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
                                    <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit Form</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </header>
            <div className='h-full p-2'>
                <div className='h-full space-y-5 rounded-lg border border-sidebar-border p-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center gap-2' onClick={() => router.back()}>
                            <ChevronLeft />
                            <span>Back</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Link href={`/live-form/${state.form.id}`} target='_blank'>
                                <Button><SquareArrowOutUpRight /> Live Preview</Button>
                            </Link>
                            <Button className='bg-success'><Share2 /> Share</Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <FormController />
                        <FormUI />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageClient
