import React from "react";
import { Funnel } from "lucide-react";


const ButtonFilter = () => {
  return (
    <div className="relative h-8 flex items-center text-center text-sm text-[#fff] font-sf-pro">
      <div className="flex items-center gap-2 h-8 px-4 py-px rounded-lg bg-[#0250d9] overflow-hidden shadow-[0px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0.5px_2px_rgba(0,0,0,0.35)_inset,2px_2px_5px_rgba(0,0,0,0.08)_inset]">
        <Funnel className="w-3 h-3 fill-current" />
        <div className="leading-[19px]">Filter</div>
      </div>
    </div>
  );
};

export default ButtonFilter;