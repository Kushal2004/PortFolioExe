import React from 'react';

const SubscribeCard = () => {
  return (
    <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col p-8 h-full justify-center items-center rounded-3xl overflow-hidden relative lg:col-span-2 lg:row-start-4 bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
      <div className="relative p-8 text-center w-full">
        <p className="text-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
          Subscribe <span className="lg:block">to my newsletter</span>
        </p>
        <form className="mt-6 sm:flex w-full lg:max-w-sm mx-auto">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            className="block w-full h-12 px-4 py-2 text-sm text-zinc-500 bg-zinc-100 dark:bg-tertiary ring-1 dark:ring-white/10 ring-primary/5 rounded-lg appearance-none focus:ring-white/20 placeholder-zinc-400 focus:border-zinc-300 focus:bg-primary focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
          <div className="mt-4 sm:ml-2 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              className="text-sm py-2 w-full px-4 h-12 font-semibold focus:ring-2 rounded-lg bg-primary dark:bg-white dark:text-primary dark:hover:text-white hover:text-primary dark:hover:bg-white/5 hover:bg-primary/10 text-white flex duration-200 focus:ring-offset-2 focus:ring-inline-flex items-center justify-between"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeCard;
