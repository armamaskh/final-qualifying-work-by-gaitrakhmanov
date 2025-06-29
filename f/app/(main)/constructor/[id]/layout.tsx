import React, { ReactNode } from 'react'

function layout( {children}:{children: ReactNode} ) {
  return ( <div className='flex flex-grow w-full'>
            {children}
          </div>); 
}

export default layout;
