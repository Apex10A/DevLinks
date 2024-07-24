import React from 'react'
import Image from 'next/image'
import GithubDark from "@/app/assets/svgs/GithubDark"
import LinkIconTwo from "@/app/assets/svgs/LinkIconTwo"
import MenuIcon from "@/app/assets/svgs/MenuIcon"
import Preview from "../../assets/images/preview-section.png"
import Hand from '../../assets/images/Hand.png'

const AddedLinks = () => {
  return (
    <div className='bg-[#FAFAFA]'>
        <div className='flex gap-10 md:px-10 md:py-10 px-4 py-4'>
        <div className='bg-[#fff] md:w-5/12 hidden lg:flex justify-center items-center mx-auto'>
            <Image src={Preview} alt=''/>
        </div>
        <div className='bg-[#fff]'>
        <div className='px-[40px] md:py-[40px] py-[20px]'>
        <div className='max-w-xl'>
            <h1 className='text-[32px] font-[700] text-[#333]'>Customize your links</h1>
            <p className='text-[16px] font-[400] text-[#737373]'>Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <div className='pt-4'>
            <button className='border border-[#633CFF] bg-transparent text-[#633CFF] font-[600] rounded-[8px] px-[27px] py-[10px] w-full'>+ Add new link
            </button>
        </div>
        </div>
       <div className='bg-[#FAFAFA] mx-[20px] md:mx-[40px] px-5 py-5'>
        <div>
        <div>
        <div className='flex items-center justify-between pb-2'>
            <p className='text-[16px] font-[700] text-[#737373] flex items-center gap-2'><MenuIcon/> Link #1</p>
            <p className='text-[16px] font-[400] text-[#737373]'>Remove</p>
        </div>
        <div>
            <p className='text-[12px] font-[400] pb-1'>Platform</p>
            <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
            <GithubDark/>
            <label htmlFor="Email"></label>
            <select name="" id="" className='py-[12px] px-[16px] w-full cursor-pointer border-none outline-none'>
                <option value="">GitHub</option>
                <option value="">LinkedIn</option>
            </select>
        </div>
        </div>

        <div className='mt-2'>
            <p className='text-[12px] font-[400] pb-1'>Link</p>
        <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
            <LinkIconTwo/>
            <label htmlFor="Email"></label>
            <input type="email" name="" className='py-[12px] px-[16px] w-full  border-none outline-none' placeholder='e.g. alex@email.com' id="" />
        </div>
        </div>
        
        </div>

        <div className='mt-10'>
        <div>
        <div className='flex items-center justify-between pb-2'>
            <p className='text-[16px] font-[700] text-[#737373] flex items-center gap-2'><MenuIcon/> Link #2</p>
            <p className='text-[16px] font-[400] text-[#737373]'>Remove</p>
        </div>
        <div>
            <p className='text-[12px] font-[400] pb-1'>Platform</p>
            <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
            <GithubDark/>
            <label htmlFor="Email"></label>
            <select name="" id="" className='py-[12px] px-[16px] w-full cursor-pointer border-none outline-none'>
                <option value="">Youtube</option>
                <option value="">LinkedIn</option>
            </select>
        </div>
        </div>

        <div className='mt-2'>
            <p className='text-[12px] font-[400] pb-1'>Link</p>
        <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
            <LinkIconTwo/>
            <label htmlFor="Email"></label>
            <input type="email" name="" className='py-[12px] px-[16px] w-full  border-none outline-none' placeholder='e.g. alex@email.com' id="" />
        </div>
        </div>
        
        </div>
        </div>
        </div>
       </div>

       <div className='border-t border-t-[#D9D9D9] py-[24px] px-[40px] flex items-end justify-end mt-10'>
        <button className='bg-[#633CFF] rounded-[8px] px-[27px] py-[11px] text-[#fff]'>Save</button>
       </div>
        </div>
        
    </div>
    </div>
  )
}

export default AddedLinks