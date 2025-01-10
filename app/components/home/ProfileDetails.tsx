"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import MobilePreview from "./MobilePreview";

const ProfileDetails = () => {
  const [profile, setProfile] = useState({
    image: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [savedProfile, setSavedProfile] = useState({
    image: null,
    fullName: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();
    setSavedProfile({
      image: profile.image,
      fullName,
    });
  };

  return (
    <div className="bg-[#FAFAFA]">
      <div className="flex gap-10 md:px-10 md:py-10 px-4 py-4">
        {/* Mobile Preview Section */}
        <div className="bg-[#fff] md:w-6/12 hidden lg:flex justify-center items-center mx-auto">
          <MobilePreview name={savedProfile.fullName} />
        </div>

        {/* Profile Details Section */}
        <div className="bg-[#fff]">
          <div className="px-[40px] md:py-[40px] py-[20px]">
            <div className="max-w-xl">
              <h1 className="md:text-[32px] text-[24px] font-[700] text-[#333]">
                Profile Details
              </h1>
              <p className="text-[16px] font-[400] text-[#737373]">
                Add your details to create a personal touch to your profile.
              </p>
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div className="bg-[#FAFAFA] flex flex-col items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-10">
            <div className="max-w-xl flex flex-col items-center justify-center pt-10">
              <p className="text-[16px] font-[400] text-[#737373]">
                Profile picture
              </p>
              <div
                className="mt-4 w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
              >
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt="Uploaded Profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Profile Details Inputs */}
          <div className="bg-[#FAFAFA] flex flex-col items-center justify-center mx-[20px] md:mx-[40px] px-4 md:px-10 py-10 mt-5">
            <div className="max-w-xl w-full space-y-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-[16px] font-[400] text-[#737373]">
                  First name*
                </label>
                <input
                  type="text"
                  className="border border-[#D9D9D9] bg-[#fff] rounded-[8px] py-[5px] px-[16px]"
                  placeholder="e.g. John"
                  value={profile.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-[16px] font-[400] text-[#737373]">
                  Last name*
                </label>
                <input
                  type="text"
                  className="border border-[#D9D9D9] bg-[#fff] rounded-[8px] py-[5px] px-[16px]"
                  placeholder="e.g. Appleseed"
                  value={profile.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[16px] font-[400] text-[#737373]">
                  Email*
                </label>
                <input
                  type="email"
                  className="border border-[#D9D9D9] bg-[#fff] rounded-[8px] py-[5px] px-[16px]"
                  placeholder="e.g. email@example.com"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-t-[#D9D9D9] py-[24px] px-[40px] flex items-end justify-end mt-10">
            <button
              className="bg-[#633CFF] rounded-[8px] w-full md:w-auto px-[27px] py-[11px] text-[#fff]"
              onClick={handleSave}
              disabled={!profile.firstName || !profile.lastName || !profile.email}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
