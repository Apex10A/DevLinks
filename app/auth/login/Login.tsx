"use client"
import React, { useState, useEffect } from 'react';
import DevLinks from '@/app/assets/svgs/DevLinks';
import DevLinksLogo from '@/app/assets/svgs/DevLinksLogo';
import MailIcon from '@/app/assets/svgs/MailIcon';
import PasswordIcon from '@/app/assets/svgs/PasswordIcon';
import { auth } from '../../firebase/Fire';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import Link from 'next/link';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authUser, isLoading } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push('/auth/homepage');
    }
  }, [authUser, isLoading, router]);

  const loginHandler = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      if (!email) setEmailError('Cant be empty');
      if (!password) setPasswordError('Cant be empty');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/auth/homepage');
    } catch (error: any) {
      console.error('An error occurred', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setPasswordError('Invalid email or password');
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('The email you have provided is already associated with an account.');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className='md:min-h-screen md:bg-[#FAFAFA] bg-[#fff] flex flex-col md:items-center justify-center'>
      <div className='flex items-center gap-2 pl-[32px] md:pl-0'>
        <DevLinksLogo />
        <DevLinks />
      </div>
      <div className='bg-[#ffffff] md:w-[50%] lg:w-[40%] md:p-[40px] p-[32px]'>
        <div>
          <p className='md:text-[32px] text-[24px] text-[#333] font-[700]'>Login</p>
          <p className='pt-2 text-[16px] text-[#333] font-[400]'>Add your details below to get back into the app</p>
        </div>
        <form onSubmit={loginHandler} className='pt-[30px] pb-6 md:pb-4'>
          <div className='pb-1'>
            <p className={`text-sm mt-1 ${emailError ? 'text-red-500' : 'text-[#333]'}`}>Email address</p>
          </div>
          <div className={`border ${emailError ? 'border-red-500' : 'border-[#D9D9D9]'} bg-[#fff] flex items-center justify-between px-4 rounded-[8px]`}>
            <MailIcon />
            
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className='py-[12px] px-[16px] w-full border-none outline-none' 
              placeholder='e.g. alex@email.com' 
              id="Email" 
            />
            {emailError && <span className='absolute right-[37px] text-red-500 text-sm'>{emailError}</span>}
          </div>
          
          <div className='pb-1'>
            <p className={`text-sm mt-1 ${passwordError ? 'text-red-500' : 'text-[#333]'}`}>Password</p>
          </div>
          <div className={`border ${passwordError ? 'border-red-500' : 'border-[#D9D9D9]'} bg-[#fff] flex items-center justify-between px-4 rounded-[8px]`}>
            <PasswordIcon />
            
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Enter your password' 
              className='py-[12px] rounded-[8px] px-[16px] w-full border-none outline-none' 
              id="password" 
            />
            {emailError && <span className='absolute right-[37px] text-red-500 text-sm'>{passwordError}</span>}
          </div>
          {/* {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} */}
          <div className='mt-6 md:mt-4 mb-7 md:mb-5'>
            <button type="submit" className='bg-[#633CFF] rounded-[8px] text-[#fff] w-full py-3 font-[600]'>Login</button>
          </div>
        </form>
        <div className='text-center max-w-[50%] mx-auto md:max-w-[100%]'>
          <p>Don&apos;t have an account? <Link href="/auth/register"><span className='text-[#633cff] cursor-pointer'>Create account</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
