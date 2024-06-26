import React from 'react';
import GitHubCalendarComponent from '../ui/GitHubCalendarComponent';

const SubscribeCard: React.FC = () => {
  return (
    <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col  p-8 h-full justify-center items-center rounded-3xl overflow-hidden relative lg:col-span-2 lg:row-start-4 bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
      <GitHubCalendarComponent username="Kushal2004"  />
    </div>
  );
};

export default SubscribeCard;
