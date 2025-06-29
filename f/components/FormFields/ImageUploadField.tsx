"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Label } from '../ui/label';
import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements/FormElements";
import { ImUpload2 } from "react-icons/im";
import useDesigner from '../../hooks/useDesigner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormControl,  FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { BorderColorControl,  BorderStyleControl, BorderWidthControl, ColorControl, HeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, PaddingControl,  WidthControl } from './FormFieldStyles/StylesFormFieldProps';
// import Image from "next/image"

const type: ElementsType = "ImageUploadField";


const extraAttributes: propertiesFormSchemaType = {
   label: "Upload Image",
   placeHolder: "Drag 'n' drop an image here, or click to select one",
   required: false };

const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   placeHolder: z.string().max(500),
   required: z.boolean() })

const styleConfig: stylesFormSchemaType = { 
   borderStyle: 'dashed',
   borderWidth: '2px',
   borderColor: 'var(--transparent)',
       marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '0px',
    marginRight: '0px',
   padding: '16px',
   height: '100px',
   width: '100%',
   color: 'var(--foreground)'  } 

const stylesSchema = z.object({ 
   borderStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),
   borderWidth: z.string().max(50).optional(),
   borderColor: z.string().max(50).optional(),
     marginTop: z.string().max(50).optional(),
     marginBottom: z.string().max(50).optional(),
     marginLeft: z.string().max(50).optional(),
     marginRight: z.string().max(50).optional(),
   padding: z.string().max(50).optional(),
   height: z.string().max(50).optional(),
   width: z.string().max(50).optional(),
   color: z.string().max(50).optional()});


export const ImageUploadFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig }),

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
      const element = formElement as CustomInstance;
      if (element.extraAttributes.required) {
         return currentValue.length > 0;
      }
      return true;
   },
   designerBtnElement: {
      icon: ImUpload2,
      label: 'UploadImage Field'
   },
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   extraAttributes: typeof extraAttributes,
   styleConfig: typeof styleConfig 
};



function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, placeHolder, required } = element.extraAttributes;
  const styles = element.styleConfig;

  const borderStyle = { borderStyle: styles.borderStyle,
                        borderWidth: styles.borderWidth,
                        borderColor: styles.borderColor };

  return (
    <div className="flex flex-col gap-2 w-full" 
         style={{ width: styles.width,
                  marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom }} >
      <Label style={{ color: styles.color }}>
        {label}{required && '*'}
      </Label>
      <div 
        className="rounded-md flex items-center justify-center"
        style={{  ...borderStyle,
                  padding: styles.padding,
                  height: styles.height,
                  color: styles.color }} >
        <p>{placeHolder}</p>
      </div>
    </div>
  );
}


function FormComponent({ elementInstance, 
                         submitValue, 
                         isInvalid, 
                         defaultValue }: {   elementInstance: FormElementInstance,
                                             submitValue?: SubmitFunction,
                                             isInvalid?: boolean,
                                             defaultValue?: string }) {
  const element = elementInstance as CustomInstance;
  const styles = element.styleConfig;
  const { label, placeHolder, required } = element.extraAttributes;
  const [image, setImage] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);

  const clearImage = () => {
    setImage(null);
   //  setFile(null);
    if (submitValue) {
      submitValue(element.id, '');}
  };

  useEffect(() => {
     if (defaultValue) {
       setImage(defaultValue);
     }
   }, [defaultValue]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
       return; }
   //  setFile(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setImage(imageData);
      if (submitValue) {
        submitValue(element.id, imageData); }  };
      reader.readAsDataURL(file);
   }, [element.id, submitValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] } 
  });

  const borderStyle = {
    borderStyle: styles.borderStyle,
    borderWidth: styles.borderWidth,
    borderColor: styles.borderColor,
  };

  return (
    <div className="flex flex-col gap-2 w-full"
             style={{  width: styles.width ,
                        marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom }}>

      <Label style={{ color: styles.color }} className={isInvalid ? 'text-red-400' : ''}>
        {label}{required && '*'}
      </Label>

      <div {...getRootProps()}
           style={{  ...borderStyle,
                     padding: styles.padding,
                     height: styles.height,
                     color: styles.color,
                     position: 'relative',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     overflow: 'hidden' }}
        className="rounded-md text-center cursor-pointer" >
        
        <input {...getInputProps()} />
        
        {image ? (   <>
                        <img 
                        src={image} 
                        alt="Uploaded" 
                        style={{  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain'}} />

                        <button  type="button"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    clearImage(); }}
                                 className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                                 style={{
                                    width: '24px',
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
                  
                  isDragActive ? ( <p>Drop the image here...</p> ) 
                               : ( <p>{placeHolder}</p> )}

      </div>
    </div>
  );
}



function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement } = useDesigner();
   const element = elementInstance as CustomInstance;
   const form = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
         label: element.extraAttributes.label,
         placeHolder: element.extraAttributes.placeHolder,
         required: element.extraAttributes.required
      }
   });

   useEffect(() => {
      form.reset(element.extraAttributes)
   }, [form, element]);

   function applyChanges(values: propertiesFormSchemaType) {
      const { label, placeHolder, required } = values;

      updateElement(element.id, {
         ...element,
         extraAttributes: { label, placeHolder, required }
      })
   }

   return <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
         className="space-y-3"
         onSubmit={(e) => {
            e.preventDefault();
         }} >

               <FormField control={form.control} name="label" render={({ field }) => (
                  <FormItem>
                     <FormLabel>Label</FormLabel>
                     <FormControl>
                        <Input {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }} />
                     </FormControl>

                     <FormDescription>
                        Метка поля. <br /> Она будет отображаться над полем.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )} />

               <FormField control={form.control} name="placeHolder" render={({ field }) => (
                  <FormItem>
                     <FormLabel>PlaceHolder</FormLabel>
                     <FormControl>
                        <Input {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }} />
                     </FormControl>

                     <FormDescription>
                        Заполнитель поля.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )} />

               <FormField control={form.control} name="required" render={({ field }) => (
                  <FormItem className="flex flex-center justify-between rounded-lg border p-3 shadow-sm">
                     <div className="space-y-0.5">
                        <FormLabel>Required</FormLabel>

                        <FormDescription>
                           Укажите, обязательно ли заполнять это поле. <br />
                           Статус будет применён при отправке формы.
                        </FormDescription>
                     </div>
                     <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )} /> 

      </form>
   </Form>
}




function StylesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement } = useDesigner();
   const element = elementInstance as CustomInstance;

   const formStyles = useForm<stylesFormSchemaType>({
      resolver: zodResolver(stylesSchema),
      mode: "onBlur",
      defaultValues: element.styleConfig
   });

   useEffect(() => {
      formStyles.reset(element.styleConfig)
   }, [element, formStyles]);

   function applyChangesStyles(values: stylesFormSchemaType) {
      updateElement(element.id, {
         ...element,
         styleConfig: values
      });
   };

   return (<div className="">
      <Form {...formStyles}>
         <form onBlur={() => formStyles.handleSubmit(applyChangesStyles)()}
            className="flex flex-row items-center gap-x-5"
            onSubmit={(e) => { e.preventDefault(); }} >


<ColorControl control={formStyles.control} />


          <div className='border-l-[1px] border-foreground h-[30px]' />

          <PaddingControl control={formStyles.control} />

          <div className='border-l-[1px] border-foreground h-[30px]' />

          <div className="flex flex-col justify-center py-1 space-y-0.5">
            <HeightControl control={formStyles.control} />
            <WidthControl control={formStyles.control} />
          </div>

         <div className='border-l-[1px] border-foreground h-[30px]' />
         
            <div className="flex flex-row items-center space-x-1">
               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginTopControl control={formStyles.control} />
                  <MarginBottomControl control={formStyles.control} />
               </div>
               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginLeftControl control={formStyles.control} />
                  <MarginRightControl control={formStyles.control} />
               </div>
            </div>
          
          
          <div className='border-l-[1px] border-foreground h-[30px]' />

          <BorderStyleControl control={formStyles.control} />
          <BorderWidthControl control={formStyles.control} />
          <BorderColorControl control={formStyles.control} />

         </form>
      </Form>

   </div>);
}






