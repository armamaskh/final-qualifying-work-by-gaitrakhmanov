"use client";

import { useCallback, useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "../../ui/dialog";
import {
   Form,
   FormControl, FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "../../ui/form";

import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Button } from '../../ui/button';

import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { toast } from 'sonner';
import { formSchema } from '@/schemas/form';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { collectionSchemaType } from '@/schemas/collection';
import { CreateCollection } from '@/api/collection';




function CreateCollectionButton() {
  const [open, setOpen] = useState(false);
   const [image, setImage] = useState<string | null>(null);
   // const [file, setFile] = useState<File | null>(null);

   const clearImage = () => {
      setImage(null);
      // setFile(null); 
   };

   const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      // setFile(file);
      const reader = new FileReader();

      reader.onload = (event) => {
         const imageData = event.target?.result as string;
         setImage(imageData); };
         reader.readAsDataURL(file); }, [ ]);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
      onDrop, 
      accept: { 'image/*': [] } });


   const router = useRouter()
   const form = useForm<collectionSchemaType>({
      resolver: zodResolver(formSchema) });

   async function onCreate(values: collectionSchemaType) {
      try{
         if(!image) {
            toast.success("Создание нового сборника без обложки"); }

         const collectionData = {
            ...values,
            cover: image?.split(',')[1]  || undefined }

         const CollectionId = await CreateCollection( collectionData ); 
         toast.success("Сборник успешно создан!");
         router.push(`/constructor/${CollectionId}`); 
         setOpen(false); 
         form.reset();
      }
      catch(error) {
         toast.error("Что-то при создании сборника пошло не так, пожалуйста, повторите попытку позже.");
         console.error(error); }
   }

   return (<Dialog open={open} onOpenChange={setOpen} >
               <DialogTrigger asChild>
                  <Button variant="outline" 
                        className='border my-10 border-primary/20 h-25 w-full rounded-3xl flex flex-col items-center justify-center  hover:border-primary hover:cursor-pointer border-dashed gap-4'>

                     <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary'/>

                     <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
                        Создать новый сборник
                     </p>

                  </Button>

               </DialogTrigger>
               <DialogContent className='z-[100]'>
                  <DialogHeader>
                     <DialogTitle>Создание сборника</DialogTitle>
                     <DialogDescription>
                        Настройте новый сборник, чтобы начать сбор научных публикаций и докладов
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
                        <FormField control={form.control} name="description" 
                           render={ ({field}) => (
                                 <FormItem>
                                    <FormLabel>Описание сборника(темы, краткое описание содержимого сборника)</FormLabel>
                                    <FormControl>
                                       <Textarea rows={5} 
                                                 className='whitespace-pre-line'
                                                 {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                 </FormItem>)} />  
                        <FormField control={form.control} name="cover" 
                           render={ () => (
                                 <FormItem>
                                    <FormLabel>Загрузите обложку создаваемого журнала или сборника публикаций</FormLabel>
                                    <FormControl>

                                       <div className="flex flex-col pt-1 w-full">
                                       
                                       
                                          <div {...getRootProps()} 
                                                className="rounded-md text-center cursor-pointer border-dashed border-foreground/50 border-2 p-1 h-50 " 
                                                style={ {position: 'relative',
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         justifyContent: 'center',
                                                         overflow: 'hidden'} }   >
                                             
                                             <input {...getInputProps()} />
                                             
                                             {image ? (  <> 
                                                            <Image src={image} 
                                                                  alt="Uploaded" 
                                                                  style={{  maxWidth: '100%',
                                                                           maxHeight: '100%',
                                                                           objectFit: 'contain'}} />
                                       
                                                            <button  type="button"
                                                                     onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        clearImage(); }}
                                                                     className="absolute top-2 right-2 bg-foreground-muted rounded-full p-1 shadow-sm hover:bg-gray-100"
                                                                     style={{ width: '24px',
                                                                              height: '24px',
                                                                              display: 'flex',
                                                                              alignItems: 'center',
                                                                              justifyContent: 'center' }} >

                                                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                     <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                     <line x1="6" y1="6" x2="18" y2="18"></line>
                                                               </svg>
                                                               </button>
                                                         </> 
                                                      ) : 
                                                      isDragActive ? ( <p>Ловлю...</p> ) 
                                                                     : ( <p>Бросьте изображение сюда...</p> )}
                                    
                                          </div>
                                       </div>
                                       

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

export default CreateCollectionButton