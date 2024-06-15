import React from "react";
import { GridBackgroundDemo } from "../ui/GridBackgroundDemo"; // Adjust the path based on your directory structure

const DesignerCard = () => {
  return (
    <div className="lg:col-span-2 xl:col-span-1 h-full flex flex-col justify-between lg:row-span-2 rounded-3xl p-0 relative overflow-hidden">
      <GridBackgroundDemo />
      <div className="relative z-10 p-8 bg-opacity-70 dark:bg-opacity-70 rounded-3xl">
        <p className="text-xl tracking-tight font-medium text-primary dark:text-white md:text-3xl">
          As a digital designer, my expertise lies in crafting distinctive
          visual identities for digital products.
          <br />
          <br />
          I hold the belief that an engaging design begins with shared values, transparent
          communication, and a genuine respect for the audience.
        </p>
        <p className="text-primary dark:text-white mt-4">Michael Andreuzza</p>
      </div>
    </div>
  );
};

export default DesignerCard;
