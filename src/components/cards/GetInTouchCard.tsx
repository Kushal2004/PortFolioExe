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
  return (
    <AuroraBackground>
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative w-full"
      >
        <p className="text-xl tracking-tight font-medium text-primary dark:text-white sm:text-4xl">
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
          className="my-8"
          method="POST"
          action="https://formsubmit.co/send2kushal@gmail.com"
          encType="multipart/form-data"
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4  ">
            <LabelInputContainer>
              <Label htmlFor="firstname">Name</Label><Input required autoComplete="name" id="firstname" name="firstname" placeholder="Name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email">Email</Label><Input required autoComplete="email" id="email" name="email" placeholder="Your Mail" type="email" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">Subject</Label><Input required  id="subject" name="_subject" placeholder="Subject" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="body">Message</Label><Textarea required rows={4} id="body" name="message" className="form-control" placeholder="Type your message here "></Textarea>
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form><p className="mb-4 text-sm">Or email <a className="text-blue-600 dark:text-blue-400 underline" href="mailto:send2kushal@gmail.com">send2kushal@gmail.com</a>.</p>
      </motion.div>
    </AuroraBackground>
  );
};

export default GetInTouchCard;
