
import React from 'react'

interface CustomButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function CustomButtonLink({ text, isActive, onClick }: CustomButtonProps) {

  return (
    <div 
      className="w-20 h-3.5 relative rounded-sm cursor-pointer"
      onClick={onClick}
      style={{ cursor: 'pointer' }} > 

        {isActive && (
           <div className="w-20 h-3 left-0 top-[1px] absolute bg-black/20 rounded-sm blur-[5px]" />)}

        <div
           className={`left-[7px] top-0 absolute justify-start text-black/70 text-base 
                       ${isActive ? 'font-bold' : 'font-normal'} `} >
           {text}
        </div>



   </div>
  );
}

export default CustomButtonLink