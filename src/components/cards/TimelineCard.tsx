import React from "react";
import { GridBackgroundDemo } from "../ui/GridBackgroundDemo"; // Adjust the path based on your directory structure
import TimelineCard from "../ui/TimeLine";
const DesignerCard = () => {
  return (
    <div className="lg:col-span-2 xl:col-span-1 h-full flex flex-col justify-between lg:row-span-2 rounded-3xl p-0 relative overflow-hidden">
      <GridBackgroundDemo />
   
      <TimelineCard/>

    </div>
  );
};

export default DesignerCard;
