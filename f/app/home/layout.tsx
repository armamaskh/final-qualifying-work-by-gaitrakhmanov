"use client"
import DefaultFooter from '@/components/CustomElementsUI/CustomFooters/DefaultFooter'
import MinFooter from '@/components/CustomElementsUI/CustomFooters/MinFooter';

import NavBarDefault from '@/components/CustomElementsUI/CustomNavBar/NavBarDefault'
import NavBarMin from '@/components/CustomElementsUI/CustomNavBar/NavBarMin';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}


function Layout ( {children }:LayoutProps  ) {
  const pathname = usePathname();

  const layoutVariant = pathname?.startsWith('/builder') 
                        || pathname?.startsWith('/forms')  
                    ? 'minimal'
                    : 'default'

                            
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background'>

      {layoutVariant === "minimal" ? <NavBarMin /> : <NavBarDefault />}

      <main className='flex justify-center flex-grow px-5' >
          {children}
      </main>

      {layoutVariant === "minimal" ? <MinFooter /> : <DefaultFooter />}

    </div>
  );
}

export default Layout 