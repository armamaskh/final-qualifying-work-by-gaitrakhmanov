"use client";

import React from 'react'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "./ui/dialog"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "./ui/form"

import { BsFileEarmarkPlus } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { Button } from './ui/button';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { formSchema, formSchemaType } from '@/schemas/form';
import { CreateForm } from '@/api/form';
import { useRouter } from 'next/navigation';




function CreateFormButton() {
   const router = useRouter()
   const form = useForm<formSchemaType>({
      resolver: zodResolver(formSchema)
   });

   async function onSubmit(values: formSchemaType) {
      try{
         const formId = await CreateForm(values);
         toast.success("Form created successfully");

         router.push(`/builder/${formId}`); }
      catch(error) {
         toast.error("Something went wrong, please try again later."); 
      console.error(error); }
   }

   return (<Dialog>
      <DialogTrigger asChild>
         <Button variant="outline" className='group border border-primary/20 h-full items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4'>
            <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary'/>
            <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>Create new chapter</p>
         </Button>
      </DialogTrigger>
      <DialogContent>
         <DialogHeader>
            <DialogTitle>Создать форму</DialogTitle>
            <DialogDescription>Создайте новую форму, чтобы начать сбор ответов</DialogDescription>
         </DialogHeader>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
               <FormField control={form.control} name="name" 
                  render={ ({field}) => (
                        <FormItem>
                           <FormLabel>Название</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage/>
                        </FormItem>)} />          
               <FormField control={form.control} name="description" 
                  render={ ({field}) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea rows={5} {...field} />
                           </FormControl>
                           <FormMessage/>
                        </FormItem>)} />            
            </form>
         </Form>
         <DialogFooter>
            <Button disabled={form.formState.isSubmitting} 
                    className='w-full mt-4'
                    onClick={form.handleSubmit(onSubmit)}>
               {!form.formState.isSubmitting && <span>Save</span> }
               {form.formState.isSubmitting && <ImSpinner2 className='animate-spin'/> }
            </Button>
         </DialogFooter>
      </DialogContent>
   </Dialog>)
}

export default CreateFormButton