import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from '../../hooks/useDesigner'
import { UpdateFormContent } from '@/api/form';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';

function SaveFormButton({id}: {id:number}) {
  const {elements} = useDesigner();
  const [loading, startTransition] = useTransition()

  const updateFormContent = async () => {
    try{
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);

      toast.success("Ваша форма была сохранена!"); }
    catch(error) {
      toast.error("Что-то не так!");
      console.error(error);}
  }
  return (
    <Button variant="link" 
            className="gap-2 hover:cursor-pointer focus-visible:ring-0" 
            disabled={loading} 
            onClick={() => {startTransition(updateFormContent)}}>
      <HiSaveAs className='h-4 w-4'/>
      Save
      {loading && <FaSpinner className='animate-spin'/>}
    </Button>
  )
}

export default SaveFormButton