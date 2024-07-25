import React from 'react'
import DevLink from '@/app/assets/svgs/Devlink'
import DevLinksLogo from '@/app/assets/svgs/DevLinksLogo'
import LinkIcon from '@/app/assets/svgs/LinkIcon'
import ProfileIcon from '@/app/assets/svgs/ProfileIcon'
import EyeIcon from '@/app/assets/svgs/EyeIcon'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='bg-[#FAFAFA] md:px-[40px] md:py-[30px] '>
        <div className='bg-[#fff] flex items-center justify-between md:px-10 py-[20px] px-[24px]'>
        <div className='flex items-center gap-2 '>
            <div>
            <DevLinksLogo/>
            </div>
            <div className='hidden md:flex'>
            <DevLink/>
            </div>
        </div>
        <div className='flex items-center gap-3'>
        <div className=''>
            <div className='bg-[#EFEBFF] px-[27px] py-[10px] rounded-[8px] flex items-center gap-2 '>
            <LinkIcon/>
            <p className='font-[600] text-[#633CFF] hidden md:flex'>Links</p>
            </div>
        </div>
        <div className='cursor-pointer'>
            <Link href='/auth/profile'>
            <div className='bg-transparent px-[27px] py-[10px] rounded-[12px] flex items-center gap-2'>
            <ProfileIcon/>
            <p className='text-[#737373] font-[600] hidden md:flex'>Profile Details</p>
            </div>
            </Link>
        </div>
        </div>

        <div>
            <div className='border border-[#633CFF] bg-transparent rounded-[8px] px-[27px] py-[10px]'>
            <Link href='/auth/preview'>
            <div className='flex md:hidden'>
            <EyeIcon/>
            </div>
            <p className='text-[#633CFF] font-[600] hidden md:flex'>Preview</p>
            </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header