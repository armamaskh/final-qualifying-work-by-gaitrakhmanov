"use client";

import React, { useState } from 'react';
import { Dialog,
         DialogContent,
         DialogDescription,
         DialogFooter,
         DialogHeader,
         DialogTitle,
         DialogTrigger } from "./ui/dialog";
import { Form,
         FormControl, FormField,
         FormItem,
         FormLabel,
         FormMessage } from "./ui/form";

import { ImSpinner2 } from "react-icons/im";
import { Button } from './ui/button';


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { divisionSchema, divisionSchemaType } from '@/schemas/division';
import { CreateDivision, CreateMainDivision } from '@/api/division';
import { DivisionInstance } from './Context/ConstructorContext';




function CreateDivisionButton({section_id,  setDivisions}: { section_id: number,
                                                             setDivisions: React.Dispatch<React.SetStateAction<DivisionInstance[]>>;}) {
   const [open, setOpen] = useState(false);
   const form = useForm<divisionSchemaType>({
      resolver: zodResolver(divisionSchema) });

   async function onCreate(values: divisionSchemaType) {
      try{
         const targetNames = ["main", 
                                 "Основная","основная",
                                 "Часть","часть", 
                                 "Публикации","публикации", 
                                 "Статьи", "статьи"];
         const isMainSection  = targetNames.some(name => values.name.includes(name));
         toast.success("Раздел успешно создан!"); 

         let new_division = null;
         if(isMainSection) {
            new_division = await CreateMainDivision( section_id, values ); }
         else {
            new_division = await CreateDivision( section_id, values );  
            window.open(`${window.location.origin}/builder/${new_division.form_id}`, "_blank");  }

         setDivisions(prev => [
            ...prev,
            { ...new_division, section_id: section_id, content_items: []} ]);

         setOpen(false); 
         form.reset(); }
      catch(error) {
         toast.error("Что-то при создании раздела пошло не так, пожалуйста, повторите попытку позже.");
         console.error(error);  }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="link" 
                    className='cursor-pointer'>

               <p className='font-medium  text-[16px] text-foreground/70 group-hover:text-primary'>
                  Новый раздел
               </p>

            </Button>

         </DialogTrigger>
         <DialogContent className='z-[100]'>
            <DialogHeader>
               <DialogTitle>Создание раздела</DialogTitle>
               <DialogDescription>
                  Настройте новый раздел сборника, чтобы изменить внутреннюю структуру сборника научных публикаций и докладов
               </DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onCreate)} className='space-y-5'>
                  <FormField control={form.control} name="name" 
                     render={ ({field}) => (
                           <FormItem>
                              <FormLabel>Название</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage/>
                           </FormItem>)} />                                     
               </form>
            </Form>

            <DialogFooter>
               <Button disabled={form.formState.isSubmitting} 
                     className='w-full mt-4'
                     onClick={form.handleSubmit(onCreate)}>
                  {!form.formState.isSubmitting && <span>Создать</span> }
                  {form.formState.isSubmitting && <ImSpinner2 className='animate-spin'/> }
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>);
}

export default CreateDivisionButton