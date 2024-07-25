import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import './Mobile.css';
import app from '../../firebase/Fire'; // Ensure Firebase is initialized
import GithubDark from "@/app/assets/svgs/GithubDark";
import MobilePrevieww from "../../assets/svgs/MobilePrevieww"
import LinkedInIcon from "@/app/assets/svgs/LinkedInIcon";
// Import other icons similarly

// Map platform names to icons and colors
const platformIcons = {
  github: <GithubDark />,
  linkedin: <LinkedInIcon />,
  // Add other icons here
};

const platformColors = {
  github: 'bg-black',
  linkedin: 'bg-blue-600',
  youtube: 'bg-red-600',
  'dev.to': 'bg-gray-900',
  codewars: 'bg-purple-600',
  freecodecamp: 'bg-pink-600',
};

const MobilePreview = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());

  useEffect(() => {
    const db = getDatabase(app);
    const profileRef = ref(db, 'profile');
    const linksRef = ref(db, 'links/items');

    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    });

    onValue(linksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const linkArray = Object.values(data);
        setLinks(linkArray);
        setSelectedPlatforms(new Set(linkArray.map(link => link.platform)));
      }
    });
  }, []);

  const handleRemoveLink = (id, platform) => {
    const db = getDatabase(app);
    const linkRef = ref(db, `links/items/${id}`);
    remove(linkRef).then(() => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
      setSelectedPlatforms(prevPlatforms => {
        const updatedPlatforms = new Set(prevPlatforms);
        updatedPlatforms.delete(platform);
        return updatedPlatforms;
      });
    }).catch((error) => {
      console.error("Error removing link: ", error);
    });
  };

  return (
    <div className='relative flex items-center justify-center'>
      <div>
        <MobilePrevieww />
      </div>
      <div className='absolute inset-0 flex flex-col items-center justify-center p-4'>
        {/* Profile Skeleton */}
        <div className='skeleton-img rounded-full mb-4 bg-[#efefef] w-20 h-20'></div>
        <div className='skeleton-text rounded-xl mb-4 bg-[#efefef] w-20 py-2'></div>
        <div className='skeleton-text2 rounded-xl mb-4 bg-[#efefef] w-20 py-1'></div>
        
        {/* Display Links */}
        {Array.from({ length: 6 }).map((_, index) => {
          const link = links[index];
          if (link) {
            return (
              <div key={link} className='mb-4 flex flex-col items-center justify-center w-full mx-auto'>
                <button
                  className={`skeleton-texts flex items-center justify-center rounded-lg w-20 py-3 ${platformColors[link.platform]}`}
                  onClick={() => handleRemoveLink(link.id, link.platform)}
                >
                  {platformIcons[link.platform] && (
                    <span className='mr-2'>
                      {platformIcons[link.platform]}
                    </span>
                  )}
                  <span className='text-white'>{link.platform}</span>
                </button>
              </div>
            );
          } else {
            return (
              <div key={index} className='mb-4 flex flex-col items-center justify-center w-full mx-auto'>
                <div className='skeleton-text bg-[#efefef] rounded-lg w-20 py-3'></div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MobilePreview;
