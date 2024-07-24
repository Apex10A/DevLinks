"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getDatabase, ref, set, push } from 'firebase/database';
import app from '../../firebase/Fire'; // Ensure you have Firebase initialized
import Preview from "../../assets/images/preview-section.png";
import Hand from '../../assets/images/Hand.png';
import GithubDark from "@/app/assets/svgs/GithubDark";
import LinkIconTwo from "@/app/assets/svgs/LinkIconTwo";
import MenuIcon from "@/app/assets/svgs/MenuIcon";
import MobilePreview from "./MobilePreview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkedInIcon from '@/app/assets/svgs/LinkedInIcon';

const HomePage = () => {
    const [showAddLinkForm, setShowAddLinkForm] = useState(false);
    const [links, setLinks] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());

    const saveData = async () => {
        const db = getDatabase(app);
        const linkRef = ref(db, 'links/items');
        try {
            await Promise.all(links.map(async (link) => {
                const newDoc = push(linkRef);
                await set(newDoc, {
                    link: link.url,
                    platform: link.platform,
                });
            }));
            toast.success("Data saved successfully");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleAddLinkClick = () => {
        setLinks([...links, { id: links.length + 1, platform: '', url: '' }]);
        setShowAddLinkForm(true);
    };

    const handleRemoveLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
        const removedLink = links.find(link => link.id === id);
        if (removedLink) {
            setSelectedPlatforms(prevPlatforms => {
                const updatedPlatforms = new Set(prevPlatforms);
                updatedPlatforms.delete(removedLink.platform);
                return updatedPlatforms;
            });
        }
    };

    const validateUrl = (platform, url) => {
        const platformPatterns = {
            github: /^https:\/\/github\.com\/.+$/,
            linkedin: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
            youtube: /^https:\/\/(www\.)?youtube\.com\/.+$/,
            devto: /^https:\/\/dev\.to\/.+$/,
            codewars: /^https:\/\/www\.codewars\.com\/.+$/,
            freecodecamp: /^https:\/\/www\.freecodecamp\.org\/.+$/,
        };
        return platformPatterns[platform]?.test(url);
    };

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        setLinks(links.map(link => {
            if (link.id === id) {
                if (name === 'platform') {
                    setSelectedPlatforms(prevPlatforms => {
                        const updatedPlatforms = new Set(prevPlatforms);
                        if (updatedPlatforms.has(value)) {
                            toast.error("This platform has already been added.");
                            return prevPlatforms; // No changes to the set
                        }
                        updatedPlatforms.add(value);
                        updatedPlatforms.delete(link.platform); // Remove old platform
                        return updatedPlatforms;
                    });
                }

                if (name === 'url') {
                    const isValid = validateUrl(link.platform, value);
                    if (!isValid) {
                        toast.error(`Invalid URL for ${link.platform}`);
                        return link;
                    }
                }

                return { ...link, [name]: value };
            }
            return link;
        }));
    };

    return (
        <div className='bg-[#FAFAFA]'>
            <div className='flex gap-10 md:px-10 md:py-10 px-4 py-4'>
                <AnimatePresence>
                    <motion.div
                        className='bg-[#fff] md:w-6/12 hidden lg:flex justify-center py-10 mx-auto'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <MobilePreview links={links} />
                    </motion.div>
                </AnimatePresence>
                <div className='bg-[#fff]'>
                    <div className='px-[40px] md:py-[20px] py-[20px]'>
                        <div className='max-w-xl'>
                            <h1 className='md:text-[32px] text-[24px] font-[700] text-[#333]'>
                                Customize your links
                            </h1>
                            <p className='text-[16px] font-[400] text-[#737373]'>
                                Add/edit/remove links below and then share all your profiles with the world!
                            </p>
                        </div>
                        <div className='pt-6'>
                            <button
                                className='border border-[#633CFF] bg-transparent text-[#633CFF] font-[600] rounded-[8px] px-[27px] py-[10px] w-full'
                                onClick={handleAddLinkClick}
                                disabled={selectedPlatforms.size === 6} // Disable if all platforms are selected
                            >
                                + Add new link
                            </button>
                        </div>
                    </div>
                    <div className='bg-[#FAFAFA] flex flex-col items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-3'>
                        <AnimatePresence>
                            {!showAddLinkForm && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image src={Hand} alt='Hand' />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {showAddLinkForm ? (
                            links.map(link => (
                                <motion.div
                                    key={link.id}
                                    className='flex flex-col max-w-xl w-full'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className='mb-10'>
                                        <div className='flex items-center justify-between pb-2'>
                                            <p className='text-[16px] font-[700] text-[#737373] flex items-center gap-2'>
                                                <MenuIcon /> Link #{link.id}
                                            </p>
                                            <p
                                                className='text-[16px] font-[400] text-[#737373] cursor-pointer'
                                                onClick={() => handleRemoveLink(link.id)}
                                            >
                                                Remove
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-[12px] font-[400] pb-1'>Platform</p>
                                            <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
                                                <GithubDark />
                                                <label htmlFor={`platform-${link.id}`} className='sr-only'>Platform</label>
                                                <select
                                                    name="platform"
                                                    id={`platform-${link.id}`}
                                                    className='py-[12px] px-[16px] w-full cursor-pointer border-none outline-none'
                                                    value={link.platform}
                                                    onChange={(e) => handleChange(link.id, e)}
                                                >
                                                    <option value="" disabled>Select platform</option>
                                                    <option value="github">GitHub</option>
                                                    <option value="linkedin">LinkedIn</option>
                                                    <option value="youtube">YouTube</option>
                                                    <option value="devto">Dev.to</option>
                                                    <option value="codewars">Codewars</option>
                                                    <option value="freecodecamp">FreeCodeCamp</option>
                                                </select>
                                            </div>
                                            <div className='mt-2'>
                                                <p className='text-[12px] font-[400] pb-1'>Link</p>
                                                <div className='border border-[#D9D9D9] bg-[#fff] flex items-center justify-between px-4 rounded-[8px]'>
                                                    <LinkIconTwo />
                                                    <label htmlFor={`link-${link.id}`} className='sr-only'>Link</label>
                                                    <input
                                                        type="url"
                                                        name="url"
                                                        id={`link-${link.id}`}
                                                        className='py-[12px] px-[16px] w-full border-none outline-none active active:border active:border-[#962be344]'
                                                        placeholder='e.g. https://github.com/username'
                                                        value={link.url}
                                                        onChange={(e) => handleChange(link.id, e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className='max-w-xl flex flex-col items-center justify-center pt-10'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className='md:text-[32px] text-[24px] font-[700] text-[#333]'>
                                    Let’s get you started
                                </h1>
                                <p className='text-[16px] font-[400] text-[#737373]'>
                                    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
                                </p>
                            </motion.div>
                        )}
                    </div>
                    <div className='bg-[#fff] flex flex-col items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-3'>
                        <div className='max-w-xl flex flex-col items-center justify-center pt-10'>
                            <button
                                className='bg-[#633CFF] text-[#fff] font-[600] rounded-[8px] px-[27px] py-[10px] w-full'
                                onClick={saveData}
                                disabled={!links.length}
                            >
                                Save Links
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default HomePage;
