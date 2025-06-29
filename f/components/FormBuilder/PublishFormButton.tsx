import React, {  useTransition } from 'react'
import { Button } from '../ui/button'
import { MdOutlinePublish } from 'react-icons/md'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
         AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
         AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from 'sonner'
import {PublishForm} from "@/api/form";
import { useRouter } from 'next/navigation'

function PublishFormButton({id}: {id:number}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    
    try{
      await PublishForm(id);
      toast.success("Ваша форма теперь доступна для всеобщего обозрения");
      router.refresh();
    }
    catch(error) {
      toast.error("Что-то пошло не так");
      console.error(error);}
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          <Button className='bg-neutral-400 rounded-[8px] focus-visible:ring-0 h-5 hover:no-underline hover:opacity-60 hover:cursor-pointer' variant="link">
            <MdOutlinePublish className="h-4 w-6 " />
            Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
            <AlertDialogDescription>Это действие нельзя отменить. После публикации вы не сможете редактировать эту форму. <br/>
            <br/>
            <span>
              Опубликовав эту форму, вы сделаете ее доступной для общественности.
            </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm) }}>
              Выполнить {loading && <FaIcons className='animate-spin'/>}
            </AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  
  )
}

export default PublishFormButton