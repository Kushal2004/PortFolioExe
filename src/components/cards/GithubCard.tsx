import React from 'react';
import GitHubCalendarComponent from '../ui/GitHubCalendarComponent';

const GithubCard: React.FC = () => {
  return (
    <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col  p-8 h-full justify-center items-center rounded-3xl overflow-hidden relative lg:col-span-2 lg:row-start-4 bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
        <p className="text-xl text-primary dark:text-white lg:text-4xl tracking-tight pb-2">
          My Contributions!
        </p>
      <GitHubCalendarComponent username="Kushal2004"  />
    </div>
  );
};

export default GithubCard;
