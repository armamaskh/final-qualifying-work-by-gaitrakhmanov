"use client";

import { Button } from "react-day-picker";
import { FaPlus } from "react-icons/fa6";
import { MdSwapVert } from "react-icons/md";

export default function AddElementButton({ index,
                            onClick,
                            isBoundary,
                            onSwapClick, }: { index: number;
                                              onClick: () => void;
                                              isBoundary: boolean;
                                              onSwapClick?: () => void; }) {
  return (
    <div className="relative w-full h-8 flex items-center justify-center z-20 group" >
      <div className={` absolute h-[2px] bg-gray-300 transition-all duration-200 
          group-hover:h-[4px] group-hover:scale-x-105 cursor-pointer
          ${isBoundary ? "w-100" : "w-40"} `} />

      <Button onClick={onClick}
              className="absolute cursor-pointer left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-white hover:bg-foreground opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all duration-200 z-50" >
        <FaPlus className="h-4 w-4" />
      </Button>

      {!isBoundary && index > 0 && ( <Button  onClick={onSwapClick}
                                              className="absolute cursor-pointer left-1/2 transform translate-x-10 h-8 w-8 rounded-full bg-primary text-white hover:bg-foreground/70 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all duration-200 z-50">
          <MdSwapVert className="h-15 w-15" />
        </Button> )}
    </div>
  );
}
