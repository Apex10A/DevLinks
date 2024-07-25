"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Preview from "../../assets/images/preview-section.png";
import Hand from '../../assets/images/Hand.png';
import MobilePreview from "./MobilePreview";
import ImageUpload from "./ImageUpload";

const ProfileDetails = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='bg-[#FAFAFA]'>
            <div className='flex gap-10 md:px-10 md:py-10 px-4 py-4'>
                <div className='bg-[#fff] md:w-6/12 hidden lg:flex justify-center items-center mx-auto'>
                    <MobilePreview  />
                </div>
                <div className='bg-[#fff]'>
                    <div className='px-[40px] md:py-[40px] py-[20px]'>
                        <div className='max-w-xl'>
                            <h1 className='md:text-[32px] text-[24px] font-[700] text-[#333]'>Profile Details</h1>
                            <p className='text-[16px] font-[400] text-[#737373]'>Add your details to create a personal touch to your profile.</p>
                        </div>
                    </div>
                    <div className='bg-[#FAFAFA] flex items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-10'>
                        <div className='max-w-xl flex flex-col items-center justify-center pt-10'>
                            <p className='text-[16px] font-[400] text-[#737373]'>Profile picture</p>
                        </div>
                        <div>
                            <ImageUpload onImageUpload={handleImageUpload} image={image} />
                        </div>
                    </div>
                    <div className='bg-[#FAFAFA] flex flex-col items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-10 mt-5'>
                        <div className='max-w-xl flex flex-col items-center justify-between pt-10'>
                            <div className='flex items-center justify-between'>
                                <p className='text-[16px] font-[400] text-[#737373]'>First name*</p>
                                <input type="text" className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between rounded-[8px] py-[5px] px-[16px]' placeholder='e.g. John' />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between pt-10'>
                            <div className='flex items-center justify-between'>
                                <p className='text-[16px] font-[400] text-[#737373]'>Last name*</p>
                                <input type="text" className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between rounded-[8px] py-[5px] px-[16px]' placeholder='e.g. Appleseed' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between pt-10'>
                            <div className='flex items-center justify-between'>
                                <p className='text-[16px] font-[400] text-[#737373]'>Email*</p>
                                <input type="email" className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between rounded-[8px] py-[5px] px-[16px]' placeholder='e.g. email@example.com' />
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-t-[#D9D9D9] py-[24px] px-[40px] flex items-end justify-end mt-10'>
                        <button className='bg-[#633CFF] opacity-[0.3] rounded-[8px] w-full md:w-auto px-[27px] py-[11px] text-[#fff]'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
