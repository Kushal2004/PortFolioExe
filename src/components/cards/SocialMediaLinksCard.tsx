import React from 'react';

const SocialMediaLinksCard = () => {
  return (
    <div className="ring-1 dark:ring-white/10 ring-primary/5 rounded-3xl justify-between shadow-xl dark:shadow-thick items-center flex flex-col p-8 h-full bg-white dark:bg-secondary">
      <div className="w-full">
        <p className="text-xl font-normal tracking-tight text-primary dark:text-white lg:text-8xl">
          Find me on
        </p>
      </div>
      <div className="grid mt-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-4 gap-y-4 gap-4 justify-center w-full">
        <a href="#" className="flex items-center justify-center aspect-square shadow-xl dark:shadow-thick hover:bg-zinc-100 dark:hover:bg-primary ring-1 bg-zinc-50 dark:ring-white/10 ring-primary/5 dark:bg-tertiary rounded-lg hover:ring-primary/5 dark:hover:ring-white/20 duration-300 group transition-all h-12 w-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail h-6 w-6 group-hover:scale-125 duration-300 text-primary dark:text-white" viewBox="0 0 24 24" stroke-width="0.8" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
            <path d="M3 7l9 6l9 -6"></path>
          </svg>
        </a>

      </div>
    </div>
  );
};

export default SocialMediaLinksCard;
