import React from 'react';
import { AuroraBackground } from '../ui/aurora-background';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/utils/cn';
import { Textarea } from '../ui/Textarea';
import { motion } from 'framer-motion';

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const GetInTouchCard: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="p-3 z-10"
      >
        <p className="text-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
          Get in touch
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Design & development
          <br />
          <br />
          Need a committed developer for your project? Have ideas to discuss? Contact me! I'm available for freelancing, collaborative efforts, and interesting challenges. <br />
          No phone calls or extensive contracts required.
        </p>
        <form
          className="my-8 dark:opacity-5 "
          method="POST"
          action="https://formsubmit.co/el/poyozu"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4  ">
            <LabelInputContainer>
              <Input id="firstname" name="firstname" placeholder="Name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Input id="email" name="email" placeholder="Your Mail" type="email" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Input id="subject" name="subject" placeholder="Subject" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Textarea id="body" name="body" className="form-control" placeholder="Type your message here "></Textarea>
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form>
      </motion.div>
      <div className="w-[100%] pb-4 h-60 relative overflow-visible">
        <iframe
          className="absolute top-0 left-0 w-[100%] h-[100%]"
          id="omg"
          src="https://mhasbini.com/miscs/react-chrome-dino-demo/index.html"
          title="Dino Game"
          loading="lazy"
        ></iframe>
      </div>
    </AuroraBackground>
  );
};

export default GetInTouchCard;
