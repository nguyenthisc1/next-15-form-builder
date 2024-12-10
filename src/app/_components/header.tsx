import { Button } from '@/components/ui/button'

const Header = () => {
    return (
        <div className='border p-5 shadow-sm'>
            <div className='flex items-center justify-between'>
                <div className='text-3xl font-bold uppercase'>Logo</div>
                <Button>Get Started</Button>
            </div>
        </div>
    )
}

export default Header
