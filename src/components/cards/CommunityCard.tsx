import React from 'react';
import { BackgroundGradient } from '../ui/background-gradient'; // Verify this path
import Image from "next/image";

const CommunityCard = () => {
  return (
    <div className="overflow:hidden lg:row-start-3 items-center h-full flex flex-col justify-center relative rounded-3xl  dark:ring-white/10 ring-primary/5">

      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 sm:w-100 bg-white dark:bg-zinc-900">
    
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        Catch Up on My Latest Blog and Projects!
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Discover my latest blog posts, projects, and publications!
        <br /> Don't miss out—new content every week, covering the latest trends and insights in technology and creativity.
        </p>
        <a href="https://kushal-blog.vercel.app/">
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1  bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Explore </span>
          <div className="h-5 w-5 rounded-full border flex items-center justify-center border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300 -rotate-90 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
        </button></a>
      </BackgroundGradient>
    </div>
  );
};

export default CommunityCard;
