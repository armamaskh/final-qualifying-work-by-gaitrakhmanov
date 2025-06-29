"use client";
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function IconGmail() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null; // или заглушка, пока тема не определена

  return (
    <Link href="" className='cursor-pointer hover:opacity-70'>
      {resolvedTheme === 'dark' ? 

         (
            <svg width="12" 
                 height="13" 
                 viewBox="0 0 12 13" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg">

               <path d="M0.818182 10.6643H2.72727V6.02794L0 3.98248V9.84612C0 10.2982 0.366136 10.6643 0.818182 10.6643Z" 
                     fill="rgba(100%,100%,100%, 0.70)"/>
               <path 
                     d="M9.27273 10.6643H11.1818C11.6339 10.6643 12 10.2982 12 9.84612V3.98249L9.27273 6.02794V10.6643Z" 
                     fill="rgba(100%,100%,100%, 0.70)"/>
               <path 
                     d="M9.27273 2.4825V6.02794L12 3.98249V2.89159C12 1.88045 10.8457 1.30295 10.0364 1.90977L9.27273 2.4825Z" 
                     fill="rgba(100%,100%,100%, 0.70)"/>
               <path 
                     fillRule="evenodd" 
                     clipRule="evenodd" 
                     d="M2.72727 6.02794V2.48249L6 4.93703L9.27273 2.4825V6.02794L6 8.48249L2.72727 6.02794Z" 
                     fill="rgba(100%,100%,100%, 0.70)"/>
               <path 
                     d="M0 2.89159V3.98248L2.72727 6.02794V2.48249L1.96364 1.90977C1.15432 1.30295 0 1.88045 0 2.89159Z" 
                     fill="rgba(100%,100%,100%, 0.70)"/>
            </svg>

         ) 
         : 
         (
            <svg width="12" 
                 height="13" 
                 viewBox="0 0 12 13" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg">

               <path 
                     d="M0.818182 10.6643H2.72727V6.02794L0 3.98248V9.84612C0 10.2982 0.366136 10.6643 0.818182 10.6643Z" 
                     fill="rgba(0%,0%,0%, 0.70)"/>
               <path 
                     d="M9.27273 10.6643H11.1818C11.6339 10.6643 12 10.2982 12 9.84612V3.98249L9.27273 6.02794V10.6643Z" 
                     fill="rgba(0%,0%,0%, 0.70)"/>
               <path 
                     d="M9.27273 2.4825V6.02794L12 3.98249V2.89159C12 1.88045 10.8457 1.30295 10.0364 1.90977L9.27273 2.4825Z" 
                     fill="rgba(0%,0%,0%, 0.70)"/>
               <path 
                     fillRule="evenodd" 
                     clipRule="evenodd" 
                     d="M2.72727 6.02794V2.48249L6 4.93703L9.27273 2.4825V6.02794L6 8.48249L2.72727 6.02794Z" 
                     fill="rgba(0%,0%,0%, 0.70)"/>
               <path 
                     d="M0 2.89159V3.98248L2.72727 6.02794V2.48249L1.96364 1.90977C1.15432 1.30295 0 1.88045 0 2.89159Z" 
                     fill="rgba(0%,0%,0%, 0.70)"/>
            </svg>          
         )
      }
    </Link>
  );
};

