import Link from 'next/link';
import React from 'react'
import SearchBar from './SearchBar';
import { useDrag } from '../../../hooks/useDrag';
import { Button } from '../../ui/button';

function NavBarMin() {
   const {dragHandlers, dragStyles } = useDrag();
   
   return (

      <nav className="z-[1] flex items-center p-[11px] select-none"
           {...dragHandlers}>
         <div className='w-full h-11 bg-neutral-400/50 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] backdrop-blur-[50px] flex items-center pl-[140px] pr-[140px]'
               style={dragStyles}>

            <div className='relative z-100 w-full flex items-center justify-between'>

               <Link href={"/home"} className='w-[225px] text-xl hover:no-underline hover:font-bold '>ВГТУ</Link>

               <div className='flex-grow flex flex-col mx-24 min-w-0'>
                  <SearchBar>привет</SearchBar>
               </div>

               <div className='flex-shrink-0 leading-4 flex flex-col items-end w-[225px]'>

                  <Button variant="link" className='text-[18px] font-normal hover:no-underline hover:font-bold  text-right mb-[-20px]'>
                     <Link href="" className='block w-full'>
                        ВОЙТИ
                     </Link>
                  </Button>

                  <Button variant="link" className='text-[14px] font-normal hover:no-underline hover:font-bold  text-right'>
                     <Link href="" className='block w-full'>
                        Зарегистрироваться
                     </Link>
                  </Button>

               </div>

            </div>
         </div>
      </nav>

   );
}

export default NavBarMin