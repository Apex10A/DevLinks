import React from 'react'
import Link from 'next/link'

const HeaderTwo = () => {
  return (
    <div className=''>
        <div className='bg-[#633CFF] absolute top-0 w-full h-[350px] hidden md:flex z-[-1] rounded-b-[32px]'></div>
        <div className='flex items-center justify-between bg-[#fff] rounded-[12px] mx-3 sm:mx-10 my-10 px-[16px] md:px-[24px] py-[16px]'>
        <div>
            <Link href='/auth/homepage'>
            <button  className='border border-[#633CFF] bg-transparent text-[#633CFF] font-[600] rounded-[8px] px-[27px] py-[10px]'>Back to Editor</button>
            </Link>
        </div>
        <div>
            <button  className='bg-[#633CFF] text-[#fff] font-[600] rounded-[8px] px-[27px] py-[10px]'>Share Link</button>
        </div>
        </div>
    </div>
  )
}

export default HeaderTwo