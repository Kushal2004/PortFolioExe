import React from 'react';

const ResumeCard = () => {
  return (
    <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col justify-between items-center rounded-3xl shadow-xl dark:shadow-thick p-8 bg-white dark:bg-secondary overflow-hidden text-center lg:text-left">
      <div>
        <p className="text-xl text-primary dark:text-white lg:text-7xl tracking-tight">
          Grab my <span className="text-blue-500">résumé!</span>
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 md:max-w-xs lg:max-w-none">
        Explore the highlights of my career by accessing my resume through this link..
        </p>
      </div>
      <div className="w-full mt-8 md:max-w-xs lg:max-w-none">
       <a href="/asserts/SDE.pdf" download="Kushal_Resume" className=''>
       <button
        
        type="button"
        className="text-sm py-2 w-full px-4 h-12 font-semibold focus:ring-2 rounded-lg bg-primary dark:bg-white dark:text-primary dark:hover:text-white hover:text-primary dark:hover:bg-white/5 hover:bg-primary/10 text-white flex duration-200 focus:ring-offset-2 focus:ring-inline-flex items-center justify-between"
      >
        Download my CV
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-download w-4 h-4"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
          <path d="M7 11l5 5l5 -5"></path>
          <path d="M12 4l0 12"></path>
        </svg>
      </button>
       </a>
      </div>
    </div>
  );
};

export default ResumeCard;
