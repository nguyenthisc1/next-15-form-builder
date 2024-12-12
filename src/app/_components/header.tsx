'use client'

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {
    const { user, isSignedIn } = useUser()

    return (
        <div className='border p-5 shadow-sm'>
            <div className='flex items-center justify-between'>
                <div className='text-3xl font-bold uppercase'>Logo</div>
                {isSignedIn ? (
                    <div className='flex items-center gap-5'>
                        <Link href='/dashboard'>
                            <Button variant='outline'>Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                ) : (
                    <SignInButton>
                        <Button>Get Started</Button>
                    </SignInButton>
                )}
            </div>
        </div>
    )
}

export default Header
