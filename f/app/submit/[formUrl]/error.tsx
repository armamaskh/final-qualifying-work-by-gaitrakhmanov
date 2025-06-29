"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

function ErrorPage({ error }: { error: Error }) {
   useEffect(() => console.error(error), [error])
   return (
      <div className='flex w-full h-full flex-col items-center justify-center gap-y-5'>
         <h2 className='text-destructive text-5xl'>
            Что-то пошло не так!
         </h2>
         <Button asChild>
            <Link href={"/home"}>Вернуться обратно</Link>
         </Button>
      </div>
   )
}

export default ErrorPage