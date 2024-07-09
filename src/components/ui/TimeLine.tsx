import React from 'react';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto ps-10 pe-3 mt-10   relative ">
      <h1 className="font-bold text-xl md:text-2xl md:leading-tight text-black dark:text-zinc-50 max-w-3xl">Here's a<span className="text-cyan-500" > timeline</span> of what I've been up to:</h1>      


      <div className="max-w-3xl mx-auto divide-zinc-800 relative">
        
        {/* Vertical line connecting timeline */}
        <div className="absolute h-full w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent -left-4 md:-left-5">
          <span className="absolute z-20 h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] before:bg-gradient-to-l before:from-transparent before:via-blue-500 before:to-cyan-500 style_meteor__iBwXl left-1" ></span>
        </div>
        
        {/* Year 2023 */}
        <div className="m-1">
          <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-200 my-8 relative">
            <div className="h-3 md:h-4 w-3 md:w-4 border-2  border-cyan-500 bg-white dark:bg-zinc-800 rounded-full absolute -left-[20px] md:-left-[29px] top-2 md:top-2"></div>
            2024
          </h1>
          <div className="mb-8">
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
                Building a new startup, this time it's going to be a big one
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
                Started writing blogs as a daily habit. Won the Nobel prize for literature
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
              Started a podcast with my brother, we talk about the latest tech news
              </span>
            </div>
          </div>
        </div>
         {/* Year 2023 */}
         <div>
         <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-200 my-8 relative">
         <div className="h-3 md:h-4 w-3 md:w-4 border-2  border-cyan-500 bg-white dark:bg-zinc-800 rounded-full absolute -left-[20px] md:-left-[26px] top-2 md:top-2"></div>
         2023
          </h1>
          <div className="mb-8">
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
              Mid life crisis and decided to change career
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
              Ended up owning a farm and a small business
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-start my-2">
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-cyan-500 mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0"></path>
              </svg>
              <span className="text-zinc-400 text-sm md:text-base">
                My brother went on to pursue a career in music, he's now a famous singer
              </span>
            </div>
          </div>
        </div>
        {/* Repeat similar structure for other years as needed */}
        
      </div>
    </div>
  );
}

export default Timeline;
