import React from 'react';

const MonomodCard: React.FC = () => {
  return (
    <a
      href="https://monomod.studio/"
      className="ring-1 lg:row-span-2 flex flex-col justify-between group hover:ring-primary/10 dark:hover:ring-white/20 duration-300 h-full dark:ring-white/10 ring-primary/5 lg:row-start-2 md:grid-cols-2 md:grid lg:gap-0 md:items-center md:gap-12 lg:grid-cols-none lg:col-start-2 lg:col-span-2 rounded-3xl p-8 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
    >
      <div>
        <p className="ext-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
          Monomod
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Design & development subscriptions for startups.
          <br />
          <br />
          Monomod streamlines the design process with a fixed monthly rate and
          limitless design requests. Say goodbye to phone calls and extensive contracts;
          reach out to Monomod directly at any time. Embrace flexibility, pause
          or terminate your subscription whenever you need.
        </p>
      </div>
      <div className="mt-8">
        <div className="iframe-container">
          <style>{`
            .iframe-container {
              width: 100%;
              height: 0;
              padding-bottom: 56.25%; /* 16:9 aspect ratio */
              position: relative;
              overflow: hidden;
              border: none;
            }
          
            .iframe-container iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: none;
            }
          `}</style>
          <iframe
            id="omg"
            src="https://mhasbini.com/miscs/react-chrome-dino-demo/index.html"
            title="Dino Game"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </a>
  );
};

export default MonomodCard;
