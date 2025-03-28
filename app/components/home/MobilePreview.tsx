import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../../firebase/Fire';
import GithubDark from "@/app/assets/svgs/GithubDark";
import MobilePrevieww from "../../assets/svgs/MobilePrevieww";
import LinkedInIcon from "@/app/assets/svgs/LinkedInIcon";
import YoutubeIcon from "@/app/assets/svgs/YoutubeIcon";
import DevToIcon from "@/app/assets/svgs/DevToIcon";
import CodewarsIcon from "@/app/assets/svgs/CodeWarsIcon";
import FreeCodeCampIcon from "@/app/assets/svgs/FreeCodeCampIcon";

const platformIcons = {
  github: <GithubDark />,
  linkedin: <LinkedInIcon />,
  youtube: <YoutubeIcon />,
  devto: <DevToIcon />,
  codewars: <CodewarsIcon />,
  freecodecamp: <FreeCodeCampIcon />,
};

const platformColors = {
  github: 'bg-[#1A1A1A]',
  linkedin: 'bg-[#2D68FF]',
  youtube: 'bg-[#EE3939]',
  devto: 'bg-[#333333]',
  codewars: 'bg-[#8A1A50]',
  freecodecamp: 'bg-[#302267]',
};

interface Link {
  id: string;
  platform: string;
  url: string;
}

interface Profile {
  avatar?: string;
  name?: string;
  bio?: string;
}

const defaultPlatforms = [
  { platform: 'github', label: 'GitHub' },
  { platform: 'linkedin', label: 'LinkedIn' },
  { platform: 'youtube', label: 'YouTube' },
  { platform: 'devto', label: 'Dev.to' },
];

const MobilePreview = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const db = getDatabase(app);
    
    // Profile listener
    const profileRef = ref(db, 'profile');
    const profileUnsubscribe = onValue(profileRef, (snapshot) => {
      setProfile(snapshot.val() || {});
    });

    // Links listener
    const linksRef = ref(db, 'links/items');
    const linksUnsubscribe = onValue(linksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const linkArray = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          platform: value.platform,
          url: value.url || value.link,
        }));
        setLinks(linkArray);
      } else {
        setLinks([]);
      }
      setLoading(false);
    });

    return () => {
      profileUnsubscribe();
      linksUnsubscribe();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute w-[308px] h-[632px]">
        <MobilePrevieww />
      </div>
      <div className="absolute inset-0 flex flex-col items-center pt-28 px-8 z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="Profile"
              className="rounded-full w-24 h-24 border-4 border-purple-500 mb-4"
            />
          ) : (
            <div className="rounded-full w-24 h-24 bg-gray-200 mb-4"></div>
          )}
          {/* <h2 className="text-xl font-bold text-gray-800">
            {profile?.name || 'Your Name'}
          </h2> */}
           <div className="rounded-md w-[160px] h-[16px] bg-gray-200 mb-4"></div>
           <div className="rounded-md w-[72px] h-[8px] bg-gray-200 mb-4"></div>
          {/* <p className="text-gray-500 text-sm">
            {profile?.bio || 'Your bio here'}
          </p> */}
        </div>

       {/* Links Section */}
       <div className="w-[237px] space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : links.length > 0 ? (
                        // Show actual links when they exist
                        links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-between p-4 rounded-lg ${
                                    platformColors[link.platform] || 'bg-gray-200'
                                } text-white`}
                            >
                                <div className="flex items-center">
                                    {platformIcons[link.platform] || <div className="w-5 h-5 mr-2"></div>}
                                    <span className="ml-2 capitalize">{link.platform}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        ))
                    ) : (
                        // Show 4 grey placeholder buttons when no links exist
                        <div className="space-y-4">
                            {defaultPlatforms.map((platform) => (
                                <div
                                    key={platform.platform}
                                    className="flex items-center justify-between p-4 rounded-lg bg-gray-200 text-gray-500"
                                >
                                    <div className="flex items-center">
                                        {platformIcons[platform.platform] || <div className="w-5 h-5 mr-2"></div>}
                                        <span className="ml-2">{platform.label}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
      </div>
    </div>
  );
};

export default MobilePreview;