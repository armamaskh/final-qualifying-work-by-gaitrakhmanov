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
import {
   Form,
   FormControl, FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "./ui/form";

import { ImSpinner2 } from "react-icons/im";
import { Button } from './ui/button';


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { sectionSchema, sectionSchemaType } from '@/schemas/section';
import { CreateSection } from '@/api/section';




function CreateSectionButton( {collection_id,
                               onSectionCreated}: { collection_id: number,
                                                    onSectionCreated?: () => void;} ) {
   const [open, setOpen] = useState(false);
   
   const form = useForm<sectionSchemaType>({
      resolver: zodResolver(sectionSchema) });

   async function onCreate(values: sectionSchemaType) {
      try{
         await CreateSection(collection_id, values)
         onSectionCreated?.();
         toast.success("Секция успешно добавлена!");
         setOpen(false); 
         form.reset(); }
      catch(error) {
         toast.error("Что-то при создании секции пошло не так, пожалуйста, повторите попытку позже.");
         console.error(error);  }
   }

   return (<Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button variant="link" 
                        className='bg-foreground/20 rounded-[8px] focus-visible:ring-0 h-5.5 hover:no-underline hover:opacity-60 hover:cursor-pointer'>
                     <p className=' text-[16px] text-foreground/70 group-hover:text-primary'>
                        Добавить секцию
                     </p>

                  </Button>

               </DialogTrigger>
               <DialogContent className='z-[100]'>
                  <DialogHeader>
                     <DialogTitle>Создание новой секции</DialogTitle>
                     <DialogDescription>
                        Создайте новую секцию, чтобы начать формировать сборник научных публикаций и докладов
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
                        <FormField control={form.control} name="section_type" 
                           render={ ({field}) => (
                                 <FormItem>
                                    <FormLabel>Тип секции(титульные элементы, вспомогательный текст, основная часть, справочно-вспомогательные элементы)</FormLabel>
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
         </Dialog>)
}

export default CreateSectionButton