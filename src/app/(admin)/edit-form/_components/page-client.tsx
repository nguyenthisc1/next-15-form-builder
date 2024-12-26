/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import FormUI from '@/app/(admin)/edit-form/_components/form-ui'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { type Doc } from '@/lib/types'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
    jsonForms: Doc<'JsonForms'>
}

const PageClient = ({ jsonForms }: Props) => {
    const router = useRouter()

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
                    <div className='flex cursor-pointer items-center gap-2' onClick={() => router.back()}>
                        <ChevronLeft />
                        <span>Back</span>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className='rounded-lg bg-gray-50 p-4'> controller</div>
                        <div className='col-span-2 flex justify-center rounded-lg bg-gray-50 p-4'>
                            <FormUI jsonForm={JSON.parse(jsonForms.jsonform)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageClient
