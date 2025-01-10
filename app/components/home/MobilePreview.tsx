import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import './Mobile.css';
import app from '../../firebase/Fire'; // Ensure Firebase is initialized
import GithubDark from "@/app/assets/svgs/GithubDark";
import MobilePrevieww from "../../assets/svgs/MobilePrevieww";
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

const MobilePreview = ({ name }: { name: string }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const profileRef = ref(db, 'profile');
    const linksRef = ref(db, 'links/items');

    // Fetch profile data
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      setProfile(data || null);
      setLoading(false);
    });

    // Fetch links data
    onValue(linksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const linkArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setLinks(linkArray);
      } else {
        setLinks([]);
      }
    });
  }, []);

  const handleRemoveLink = (id) => {
    const db = getDatabase(app);
    const linkRef = ref(db, `links/items/${id}`);
    remove(linkRef)
      .then(() => setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id)))
      .catch((error) => console.error('Error removing link:', error));
  };

  return (
    <div className="relative flex items-center justify-center">
      <div>
        <MobilePrevieww />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* Profile Section */}
        {loading ? (
          <>
            <div className="skeleton-img rounded-full mb-4 bg-[#efefef] w-20 h-20"></div>
            <div className="skeleton-text rounded-xl mb-4 bg-[#efefef] w-20 py-2"></div>
            <div className="skeleton-text2 rounded-xl mb-4 bg-[#efefef] w-20 py-1"></div>
          </>
        ) : (
          profile && (
            <>
              <img
                src={profile.avatar || '/default-avatar.png'}
                alt="Profile Avatar"
                className="rounded-full mb-4 w-20 h-20"
              />
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.bio}</p>
            </>
          )
        )}

        {/* Links Section */}
        {links.length > 0 ? (
          links.map((link) => (
            <div
              key={link.id}
              className={`mb-4 flex items-center justify-center w-full mx-auto p-4 rounded-lg ${platformColors[link.platform]}`}
            >
              <button
                className="flex items-center justify-center text-white font-semibold w-full"
                onClick={() => handleRemoveLink(link.id)}
              >
                {platformIcons[link.platform] && (
                  <span className="mr-2">{platformIcons[link.platform]}</span>
                )}
                <span>{link.platform}</span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No links added yet. Use the "Add Link" button to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
