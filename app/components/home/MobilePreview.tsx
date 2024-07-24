import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import './Mobile.css';
import app from '../../firebase/Fire'; // Ensure Firebase is initialized
import GithubDark from "@/app/assets/svgs/GithubDark";
import LinkedInIcon from "@/app/assets/svgs/LinkedInIcon";
// Import other icons similarly

// Map platform names to icons
const platformIcons = {
  github: <GithubDark />,
  linkedin: <LinkedInIcon />,
  // Add other icons here
};

const MobilePreview = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);

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
      }
    });
  }, []);

  return (
    <div className='relative'>
      <svg
        width='308'
        height='632'
        viewBox='0 0 308 632'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z'
          stroke='#737373'
        />
        <path
          d='M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z'
          fill='white'
          stroke='#737373'
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center p-4'>
        {profile && (
          <>
            <div className='skeleton-img rounded-full mb-4'>
              {/* Placeholder for profile picture */}
            </div>
            <div className='skeleton-text rounded-lg mb-2'>
              {profile.username}
            </div>
          </>
        )}
        {links.map(link => (
          <div key={link.link} className='w-40 mb-4'>
            <button className='skeleton-button flex items-center justify-center w-full h-12 bg-[#e0e0e0] rounded'>
              {platformIcons[link.platform] && (
                <span className='mr-2'>
                  {platformIcons[link.platform]}
                </span>
              )}
              <span className='text-black'>{link.platform}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobilePreview;
