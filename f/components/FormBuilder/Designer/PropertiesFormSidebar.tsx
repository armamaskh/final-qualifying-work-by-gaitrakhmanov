import { FormElements } from '@/components/FormElements/FormElements';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useDesigner from '@/hooks/useDesigner';
import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'

function PropertiesFormSidebar() {
  const {selectedElement, setSelectedElement} = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

  return (
   <div className='flex flex-col p-2 w-full'>
      <div className='flex justify-between items-center'>
         <p className='text-sm text-foreground/70'>Свойства выбранного элемента</p>
         <Button className="cursor-pointer" size={"icon"} variant={"ghost"} onClick={() => {
            setSelectedElement(null); }}>
            <AiOutlineClose />
         </Button>

      </div>
      <Separator className='mb-4' /> 
      <PropertiesForm elementInstance={selectedElement} />
   </div>
  );
}

export default PropertiesFormSidebar