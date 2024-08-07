import React from 'react';
import Switcher from '../ui/switcher';
const ModeCard = () => {
  return (
    <div
      className="row-span-1 ring-1 order-first lg:order-none dark:ring-white/10 ring-primary/5 hover:ring-primary/5 bg-white dark:bg-secondary dark:hover:ring-white/20 overflow-hidden duration-300 shadow-xl dark:shadow-thick rounded-3xl px-3 pt-3 sm:p-9"
    >  
      <Switcher/>
    </div>
  );
};

export default ModeCard;
