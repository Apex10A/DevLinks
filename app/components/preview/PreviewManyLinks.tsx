import React from 'react'
import GithubIcon from '@/app/assets/svgs/GithubIcon'
import YoutubeIcon from '@/app/assets/svgs/YoutubeIcon'
import ArrowRightIcon from "@/app/assets/svgs/ArrorRightIcon"
import LinkedInIcon from '@/app/assets/svgs/LinkedInIcon'
import Image from 'next/image'
import profilePic from "@/app/assets/images/ProfilePic.png"
import DevToIcon from '@/app/assets/svgs/DevToIcon'
import CodeWarsIcon from '@/app/assets/svgs/CodeWarsIcon'
import FreeCodeCampIcon from '@/app/assets/svgs/FreeCodeCampIcon'

const PreviewManyLinks = () => {
  return (
    <div className='relative z-20 pt-[30px]'>
        <div className='bg-[#fff] px-[56px] py-[48px] md:shadow-lg md:max-w-sm mx-auto rounded-[24px]'>
            <div className='flex flex-col items-center justify-center'>
                <Image src={profilePic} alt=''/>
                <h1 className='text-[32px] font-[700] text-[#333]'>Ben Wright</h1>
                <p className='text-[16px] font-[400] text-[#737373]'>ben@example.com</p>
            </div>
            <div className='py-10'>
            <div>
                <div className='bg-[#1A1A1A] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <GithubIcon/>
                <p className='text-[#fff]  text-[16px] font-[400]'>Github</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>
            <div className='py-5'>
                <div className='bg-[#EE3939] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <YoutubeIcon/>
                <p className='text-[#fff] text-[16px] font-[400]'>Youtube</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>
            <div>
                <div className='bg-[#2D68FF] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <LinkedInIcon/>
                <p className='text-[#fff]  text-[16px] font-[400]'>LinkedIn</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>

            <div className='py-5'>
                <div className='bg-[#333] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <DevToIcon/>
                <p className='text-[#fff]  text-[16px] font-[400]'>Dev.to</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>

            <div>
                <div className='bg-[#8A1A50] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <CodeWarsIcon/>
                <p className='text-[#fff]  text-[16px] font-[400]'>Codewars</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>

            <div className='pt-5'>
                <div className='bg-[#302267] w-full rounded-[8px] px-[16px] md:px-[27px] py-[16px] md:py-[10px] flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                <FreeCodeCampIcon/>
                <p className='text-[#fff]  text-[16px] font-[400]'>freeCodeCamp</p>
                </div> 
                <ArrowRightIcon/>   
                </div>
            </div>

            </div>
        </div>
    </div>
  )
}

export default PreviewManyLinks