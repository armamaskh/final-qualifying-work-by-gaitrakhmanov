"use client";




import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function IconSearch() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Чтобы избежать расхождения между сервером и клиентом
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null; // или заглушка, пока тема не определена

  return (
    <>
      {resolvedTheme === 'dark' ? 

         (
            <svg width="17" 
                  height="18" 
                  viewBox="0 0 17 18"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg">

                  <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"      
                        stroke="rgba(100%,100%,100%, 0.70)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  <path d="M16 16.4L13.6667 13.7867" 
                        stroke="rgba(100%,100%,100%, 0.70)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
            </svg>

         ) 
         : 
         (
            
            <svg width="17" 
            height="18" 
            viewBox="0 0 17 18"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">

                  <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"      
                        stroke="rgba(0%,0%,0%, 0.70)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  <path d="M16 16.4L13.6667 13.7867" 
                        stroke="rgba(0%,0%,0%, 0.70)"
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
            </svg>       
         )
      }
    </>
  );
};

