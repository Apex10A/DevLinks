"use client";
import React, { useState, useEffect } from 'react';
import DevLinks from '@/app/assets/svgs/DevLinks';
import DevLinksLogo from '@/app/assets/svgs/DevLinksLogo';
import MailIcon from '@/app/assets/svgs/MailIcon';
import PasswordIcon from '@/app/assets/svgs/PasswordIcon';
import { auth } from '../../firebase/Fire';
import { FirebaseError } from 'firebase/app'; // Ensure this import is correct based on your Firebase version
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import Link from 'next/link';
import { toast } from 'react-toastify'; // Import toast

const Provider = new GoogleAuthProvider();

const Create = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordLengthError, setPasswordLengthError] = useState('');
    const { authUser, isLoading } = useAuth();
    
    useEffect(() => {
        if (!isLoading && authUser) {
            // router.push('/a');
        }
    }, [authUser, isLoading, router]);

    const handleSignup = async () => {
        let hasError = false;
        
        // Reset error states
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        if (!email || !password || !confirmPassword) {
            hasError = true;
            if (!email) setEmailError('Cant be empty');
            if (!password) setPasswordError('Cant be empty');
            if (!confirmPassword) setConfirmPasswordError('Cant be empty');
        }
        if (password !== confirmPassword) {
            hasError = true;
            setPasswordError('Please check again');
        }
        
        if (hasError) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: email.split('@')[0] });
            // router.push('/auth/login');
            console.log(userCredential)
        } catch (error: unknown) {
          console.error('An error occurred during sign up:', error);
          if (error instanceof FirebaseError) {
              if (error.code === 'auth/email-already-in-use') {
                  toast.error('The email you have provided is already associated with an account.');
              } else {
                  toast.error(error.message); 
              }
          } else {
              toast.error('An unexpected error occurred.'); // Handle non-Firebase errors
          }
      }
      setConfirmPasswordError('');
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, Provider);
        } catch (error) {
            console.error('An error occurred during Google sign up:', error);
        }
    };

    return (
        <div className='md:min-h-screen md:bg-[#FAFAFA] bg-[#fff] flex flex-col md:items-center justify-center'>
            <div className='flex items-center gap-2 pl-[32px] md:pl-0'>
                <DevLinksLogo />
                <DevLinks />
            </div>
            <div className='bg-[#ffffff] md:w-[60%] lg:w-[50%] xl:[40%] md:py-[40px] md:px-[43px] p-[32px] '>
                <div>
                    <p className='md:text-[30px] text-[24px] text-[#333] font-[700]'>Create account</p>
                    <p className='pt-2 text-[16px] text-[#333] font-[400]'>Let’s get you started sharing your links!</p>
                </div>

                <div className='pt-[30px] pb-6 md:pb-4 relative'>
                    <div className='pb-1'>
                        <p className='text-[14px]'>Email address</p>
                    </div>
                    <div className={`border flex items-center px-4 rounded-[8px] ${emailError ? 'border-red-500' : 'border'}`}>
                        <MailIcon />
                        <input 
                            type="email" 
                            className={`py-[12px] px-[16px] w-full border-none outline-none ${emailError ? 'border-red-500' : 'border-gray-300'}`} 
                            placeholder='e.g. alex@email.com' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <span className='absolute right-4 text-red-500 text-sm'>{emailError}</span>}
                    </div>
                </div>

                <div className='relative'>
                    <div className='pb-1'>
                        <p>Create password</p>
                    </div>
                    <div className={`border flex items-center px-4 rounded-[8px] ${passwordError ? 'border-red-500' : 'border'}`}>
                        <PasswordIcon />
                        <input 
                            type="password" 
                            placeholder='At least 8 characters' 
                            className={`py-[12px] px-[16px] w-full border-none outline-none ${passwordError ? 'border-red-500' : 'border-gray-300'}`} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <span className='absolute right-4 text-red-500 text-sm'>{passwordError}</span>}
                    </div>
                </div>

                <div className='relative pt-6 md:pt-4'>
                    <div className='pb-1'>
                        <p>Confirm password</p>
                    </div>
                    <div className='border flex items-center px-4 rounded-[8px]'>
                        <PasswordIcon />
                        <input 
                            type="password" 
                            placeholder='At least 8 characters' 
                            className={`py-[12px] px-[16px] w-full border-none outline-none ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <span className='absolute right-4 text-red-500 text-sm'>{confirmPasswordError}</span>}
                    </div>
                </div>

                <div>
                    <p className='text-[14px] py-5 text-[#737373]'>Password must contain at least 8 characters</p>
                </div>

                <div className='mt-6 md:mt-4 mb-7 md:mb-5'>
                    <button onClick={handleSignup} className='bg-[#633CFF] rounded-[8px] text-[#fff] w-full py-3 font-[600]'>
                        Create new account
                    </button>
                </div>

                <div className='text-center max-w-[50%] mx-auto md:max-w-[100%]'>
                    <p>Already have an account? <Link href="/auth/login"><span className='text-[#633CFF]'>Login</span></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Create;
