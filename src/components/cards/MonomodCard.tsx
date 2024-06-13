import React from 'react';
import { AuroraBackground } from "../ui/aurora-background";


const MonomodCard: React.FC = () => {
  return (
   <AuroraBackground>
     <a
      href="#"
      className='p-3  '
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
   </AuroraBackground>
  );
};

export default MonomodCard;
