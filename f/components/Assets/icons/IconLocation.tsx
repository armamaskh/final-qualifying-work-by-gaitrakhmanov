"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function IconLocation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null; // или заглушка, пока тема не определена

  return (
    <>
      {resolvedTheme === 'dark' ? 
         (
            <svg width="12" 
                 height="13" 
                 viewBox="0 0 12 13" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg">  

                 <path d="M9.5 5.84393C9.5 8.70756 6 11.1621 6 11.1621C6 11.1621 2.5 8.70756 2.5 5.84393C2.5 4.86745 2.86875 3.93096 3.52513 3.24049C4.1815 2.55001 5.07174 2.16211 6 2.16211C6.92826 2.16211 7.8185 2.55001 8.47487 3.24049C9.13125 3.93096 9.5 4.86745 9.5 5.84393Z" 
                       stroke="rgba(100%,100%,100%, 0.70)" 
                       strokeWidth="1.2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"/>
                 
                 <path d="M6 7.16211C6.82843 7.16211 7.5 6.49054 7.5 5.66211C7.5 4.83368 6.82843 4.16211 6 4.16211C5.17157 4.16211 4.5 4.83368 4.5 5.66211C4.5 6.49054 5.17157 7.16211 6 7.16211Z" 
                       stroke="rgba(100%,100%,100%, 0.70)" 
                       strokeWidth="1.2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"/>
              </svg>
         ) 
         : 
         (
            <svg width="12" 
                 height="13" 
                 viewBox="0 0 12 13" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg">  

                 <path d="M9.5 5.84393C9.5 8.70756 6 11.1621 6 11.1621C6 11.1621 2.5 8.70756 2.5 5.84393C2.5 4.86745 2.86875 3.93096 3.52513 3.24049C4.1815 2.55001 5.07174 2.16211 6 2.16211C6.92826 2.16211 7.8185 2.55001 8.47487 3.24049C9.13125 3.93096 9.5 4.86745 9.5 5.84393Z" 
                       stroke="rgba(0%,0%,0%, 0.70)" 
                       strokeWidth="1.2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"/>
                 
                 <path d="M6 7.16211C6.82843 7.16211 7.5 6.49054 7.5 5.66211C7.5 4.83368 6.82843 4.16211 6 4.16211C5.17157 4.16211 4.5 4.83368 4.5 5.66211C4.5 6.49054 5.17157 7.16211 6 7.16211Z" 
                       stroke="rgba(0%,0%,0%, 0.70)" 
                       strokeWidth="1.2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"/>
            </svg>       
         )
      }
    </>
  );
};

