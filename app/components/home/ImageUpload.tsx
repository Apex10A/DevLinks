// "use client"
// import React, { useState } from 'react';
// import { Button } from '@chakra-ui/react';
// import { MdAddPhotoAlternate } from 'react-icons/md';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// interface ImageUploadProps {
//     onImageUpload: (file: File) => void;
//     image: string | ArrayBuffer | null;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, image }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             onImageUpload(file);
//         }
//     };

//     return (
//         <div
//             className='relative w-[150px] h-[150px] flex items-center justify-center bg-[#F5F5F5] rounded-[8px] overflow-hidden'
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {image ? (
//                 // <Image
//                 //     src={typeof image === 'string' ? image : URL.createObjectURL}
//                 //     alt='Uploaded'
//                 //     layout='fill'
//                 //     objectFit='cover'
//                 //     className='w-full h-full'
//                 // />
//             ) : (
//                 <div className='flex flex-col items-center justify-center'>
//                     <MdAddPhotoAlternate size={24} color='#633CFF' />
//                     <p className='text-[#633CFF]'>+ Add image</p>
//                 </div>
//             )}
//             {isHovered && !image && (
//                 <motion.div
//                     className='absolute bottom-2 bg-[#633CFF] text-[#fff] px-3 py-1 rounded-[8px]'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     Change
//                 </motion.div>
//             )}
//             <input
//                 type="file"
//                 accept="image/*"
//                 className='absolute inset-0 opacity-0 cursor-pointer'
//                 onChange={handleFileChange}
//             />
//         </div>
//     );
// };

// export default ImageUpload;
