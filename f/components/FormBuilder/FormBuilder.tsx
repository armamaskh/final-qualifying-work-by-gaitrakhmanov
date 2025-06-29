"use client";

import { form } from '@/types/models';
import { useEffect, useState } from 'react';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import useDesigner from '@/hooks/useDesigner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CustomToolBar from '../CustomToolBar';
import DragOverlayWrapper from './DragOverlayWrapper';
import StyleFormToolBar from './StyleFormToolBar';
import FormNavToolBar from './FormNavToolBar';
import Designer from './Designer/Designer';

function FormBuilder( {form}: {form: form} ) {
   const [isReady, setIsReady] = useState(false); 
   const {setElements, selectedElement} = useDesigner();


   const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: { distance: 10}
   });
   const sensors = useSensors(mouseSensor);


   useEffect(() => {
      if(isReady) return;
      const elements = JSON.parse(form.content);
      setElements(elements);
      const readyTimeout = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(readyTimeout);
   }, [form, setElements, isReady])

   if(!isReady) {
      return(
         <div className="flex flex-col items-center justify-center w-full h-full">
            <ImSpinner2 className='animate-spin h-12 w-12' />
         </div> );
   }

   const shareURL = `${window.location.origin}/submit/${form.share_url}`;

   if(form.published) {
      return( 
         <>
            <div className='flex flex-col items-center justify-center h-full w-full'>
               <div className='max-w'>
                  <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
                     Форма для сбора публикаций опубликована!
                  </h1>
                  <h2 className='text-2xl'>Share this form</h2>
                  <h3 className='text-xl text-muted-foreground border-b pb-10'>
                     Любой, у кого есть ссылка, может просмотреть и отправить данные
                  </h3>
                  <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
                     <Input className='w-full' readOnly value={shareURL}/>
                     <Button className='mt-2 w-full' 
                             onClick={ () => {
                               navigator.clipboard.writeText(shareURL);
                               toast.success("Link compiled to clipboard")
                             } }>Скопировать ссылку</Button>
                  </div>
                  <div className='flex justify-between'>

                     <Button variant="link" asChild>
                        <Link href={"/"} className='gap-2'>
                             <BsArrowLeft />
                             Вернуться обратно
                        </Link>
                     </Button>
                     <Button variant="link" asChild>
                        <Link href={`/forms/${form.id}`} className='gap-2'>
                             Детали формы
                             <BsArrowRight />
                        </Link>
                     </Button>

                  </div>
               </div>
            </div>
         </>
       )
   }


  return (
    <DndContext sensors={sensors} >
      <main className='flex flex-col w-full'>
         <CustomToolBar >
            {selectedElement && <StyleFormToolBar/>}
            {!selectedElement && <FormNavToolBar form={form} />}
         </CustomToolBar>

         <div className='mt-4 rounded-xl flex w-full flex-grow items-center justify-center relative overflow-y-auto min-h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper.svg)]'>
            <Designer />
         </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder