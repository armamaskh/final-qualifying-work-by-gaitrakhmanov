import React, { ReactNode } from 'react'
import { useDrag } from '../hooks/useDrag';

function CustomToolBar({children}:{ children: ReactNode}) {

   const { dragHandlers, dragStyles } = useDrag();
   
  return (
    <nav className='flex justify-center pt-1.5 sticky top-3 z-10' 
         {...dragHandlers}>
      <div className='flex items-center justify-between px-3 min-w-[700px] w-auto min-h-8 h-auto bg-neutral-400/50 rounded-xl backdrop-blur-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)]
      transition-all duration-300 ease-in-out' 
           style={dragStyles}>
         {children}
      </div>
    </nav>
  )
}

export default CustomToolBar