"use client";

import { useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "./ui/dialog";

import { ImSpinner2 } from "react-icons/im";
import { Button } from './ui/button';


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { divisionSchema, divisionSchemaType } from '@/schemas/division';
import { DivisionInstance } from './Context/ConstructorContext';




function CreateContentCollection({division, 
                                  form_status,
                                  form_share }: {division: DivisionInstance, 
                                                          form_status: boolean,
                                                          form_share: string }) {

  const [open, setOpen] = useState(false);

  const form = useForm<divisionSchemaType>({
      resolver: zodResolver(divisionSchema) });


   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="link" 
                    className={`cursor-pointer w-[200px] h-8  rounded-2xl p-2.5 flex justify-center items-center hover:no-underline hover:opacity-25 ${form_status ? "bg-foreground/10" : "bg-red-300/25"}`}>
              <div className="text-xs  ">
              {form_status ? "Добавить контент" : "Редактировать форму"}
              </div>
            </Button>
         </DialogTrigger>
         <DialogContent className='z-[100]'>
            <DialogHeader>
              {form_status 
                ? (<div className='space-y-5'>
                      <DialogTitle>Создание нового контента для раздела {division.name}</DialogTitle>
                      <DialogDescription>
                            Настройте новый контент раздела, чтобы дополнить внутреннюю структуру сборника   
                      </DialogDescription>
                    </div>) 
                : (<div className='space-y-5'>
                      <DialogTitle>Создание нового контента для  {division.name} невозможно без настроенной и опубликованной формы</DialogTitle>
                      <DialogDescription>
                        Настройте форму {form_share}, чтобы дальнейшее добавление контента в данный раздел было возможно
                      </DialogDescription>
                    </div>)}
               
            </DialogHeader>

            <DialogFooter>
               <Button disabled={form.formState.isSubmitting} 
                     className='w-full mt-4 cursor-pointer'
                     onClick={() => {
                        try {
                           toast.error("Создание нового раздела прошло успешно!");
                           if (form_status) window.open(`${window.location.origin}/submit/${form_share}`, "_blank"); else window.open(`${window.location.origin}/builder/${division.form_id}`, "_blank");

                           setOpen(false);
                           form.reset();} 
                        catch (error) {
                           toast.error("Что-то при создании раздела пошло не так, попробуйте позже.");
                           console.error(error); } }}>
                  {!form.formState.isSubmitting && <span>{form_status ? "Создать" : "Настроить"}</span> }
                  {form.formState.isSubmitting && <ImSpinner2 className='animate-spin'/> }
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>);
}

export default CreateContentCollection