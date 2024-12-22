'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { db } from '@/configs/drizzle'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    formId: string
}

const PageClient = ({ formId }: Props) => {
    const router = useRouter()

    const { user } = useUser()
    const [jsonForm, setJsonForm] = useState([])

    useEffect(() => {
        user && getFormData()
    }, [user])

    const getFormData = async () => {
        const result = await db
            .select()
            .from(JsonForms)
            .where(and(eq(JsonForms.id, parseInt(formId)), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress ?? user?.id ?? '')))

        if (result) {
            setJsonForm(JSON.parse(result[0].jsonform))
        }
    }

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
                        <div className='rounded-lg bg-gray-50 p-2'> controller</div>
                        <div className='col-span-2 rounded-lg bg-gray-50 p-2'> form</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageClient
