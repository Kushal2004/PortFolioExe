import React from 'react';
import { FlipWords } from '../ui/flip-words';

const words = [
  'Web Developer',
  'Web Exploiter',
  'Cybersecurity Enthusiast',
  'ML Engineer'
];

const IntroductionCard = () => {
  return (
    <div className="lg:row-span-2 ring-1 dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick rounded-3xl p-8">
      <div className="relative flex items-center gap-x-4">
        <img
          src="/images/avatar.jpg"
          alt=""
          className="h-10 w-10 rounded-full ring-1 dark:ring-white/10 ring-primary/5"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-primary dark:text-white">
            <a href="#">
              <span className="absolute inset-0"></span>
              K Kushal
            </a>
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
          <FlipWords words={words} />
          </p>
        </div>
      </div>
      <p className="text-3xl mt-6 font-medium lg:text-4xl tracking-tight text-primary dark:text-white">
        Hey, welcome to my site!
      </p>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 font-light lg:text-xl">
      A Computer Science student committed to enhancing 
      digital security and developing innovative applications. 
        <br />
        <br />
        Beyond the screen, I find happiness in the notes of the piano and the colors of my paintings.
        My life is a fusion of technical precision and artistic freedom.
      </p>
    </div>
  );
};

export default IntroductionCard;
