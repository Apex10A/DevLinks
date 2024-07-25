"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import app from '../../firebase/Fire';
import Preview from "../../assets/images/preview-section.png";
import Hand from '../../assets/images/Hand.png';
import GithubDark from "@/app/assets/svgs/GithubDark";
import LinkIconTwo from "@/app/assets/svgs/LinkIconTwo";
import MenuIcon from "@/app/assets/svgs/MenuIcon";
import MobilePreview from "./MobilePreview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkedInIcon from '@/app/assets/svgs/LinkedInIcon';

interface Link {
    id: number;
    platform: string;
    url: string;
    error?: string;
}

const HomePage: React.FC = () => {
    const [showAddLinkForm, setShowAddLinkForm] = useState(false);
    const [links, setLinks] = useState<Link[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());

    useEffect(() => {
        const db = getDatabase(app);
        const linksRef = ref(db, 'links/items');

        onValue(linksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const linkArray = Object.values(data);
                setLinks(linkArray.map((link, index) => ({ ...link, id: index + 1 })));
                setSelectedPlatforms(new Set(linkArray.map(link => link.platform)));
            }
        });
    }, []);

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

    const handleRemoveLink = (id: number) => {
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

    const validateUrl = (platform: string, url: string): boolean => {
        const platformPatterns: { [key: string]: RegExp } = {
            github: /^https:\/\/github\.com\/.+$/,
            linkedin: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
            youtube: /^https:\/\/(www\.)?youtube\.com\/.+$/,
            devto: /^https:\/\/dev\.to\/.+$/,
            codewars: /^https:\/\/www\.codewars\.com\/.+$/,
            freecodecamp: /^https:\/\/www\.freecodecamp\.org\/.+$/,
        };
        return platformPatterns[platform]?.test(url) ?? false;
    };

    const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLinks(links.map(link => {
            if (link.id === id) {
                let error = '';
                if (name === 'platform') {
                    setSelectedPlatforms(prevPlatforms => {
                        const updatedPlatforms = new Set(prevPlatforms);
                        if (updatedPlatforms.has(value)) {
                            error = "This platform has already been added.";
                            return prevPlatforms;
                        }
                        updatedPlatforms.add(value);
                        updatedPlatforms.delete(link.platform);
                        return updatedPlatforms;
                    });
                }

                if (name === 'url') {
                    const isValid = validateUrl(link.platform, value);
                    if (!isValid) {
                        error = `Invalid URL for ${link.platform}`;
                    }
                }

                return { ...link, [name]: value, error };
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
                                disabled={selectedPlatforms.size === 6}
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
                                            <div className={`border ${link.error ? 'border-red-500' : 'border-[#D9D9D9]'} bg-[#fff] flex items-center justify-between px-4 rounded-[8px]`}>
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
                                                <div className={`border ${link.error ? 'border-red-500' : 'border-[#D9D9D9]'} bg-[#fff] flex items-center justify-between px-4 rounded-[8px]`}>
                                                    <LinkIconTwo />
                                                    <label htmlFor={`link-${link.id}`} className='sr-only'>Link</label>
                                                    <input
                                                        type="url"
                                                        name="url"
                                                        id={`link-${link.id}`}
                                                        className='py-[12px] px-[16px] w-full border-none outline-none'
                                                        placeholder='e.g. https://github.com/username'
                                                        value={link.url}
                                                        onChange={(e) => handleChange(link.id, e)}
                                                    />
                                                </div>
                                                {link.error && (
                                                    <div className='text-red-500 text-sm mt-1'>
                                                        {link.error}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className='text-center'>
                                <h2 className='md:text-[20px] text-[16px] font-[600] text-[#333] py-4'>
                                    Add your links
                                </h2>
                                <p className='text-[14px] font-[400] text-[#737373] pb-6'>
                                    Click the button above to add your first link!
                                </p>
                            </div>
                        )}
                        <div className='pt-10'>
                            <button
                                className='bg-[#633CFF] text-white font-[600] rounded-[8px] px-[27px] py-[10px] w-full'
                                onClick={saveData}
                            >
                                Save
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
