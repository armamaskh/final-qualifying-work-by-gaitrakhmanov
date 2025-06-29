"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import {  z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../../hooks/useDesigner";

import { Form, 
         FormControl, 
         FormDescription, 
         FormField, 
         FormItem, 
         FormLabel, 
         FormMessage } from '../ui/form'
import {  LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";
import { BackgroundColorControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, WidthControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "SpacerField";

const extraAttributes = {
   height: 20 }

const propertiesSchema = z.object({
   height: z.number().min(5).max(500) })

const styleConfig: stylesFormSchemaType = {
   width: '100%',
   backgroundColor: 'var(--transparent)',
   marginTop: '0px',
   marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px', }


const stylesSchema = z.object({
  width: z.string().max(50).optional(),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
  backgroundColor: z.string().max(50).optional(), })


export const SpacerFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id, 
      type, 
      extraAttributes,
      styleConfig }),
   designerBtnElement: {
      icon: LuSeparatorHorizontal,
      label: "Spacer Field"},

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (): boolean => true
}


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   extraAttributes: typeof extraAttributes,
   styleConfig: typeof styleConfig };

function DesignerComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const element = elementInstance as CustomInstance;
   const {height} = element.extraAttributes;
   const styles = element.styleConfig;
   return (
   <div  style={{ height: height,
                  width: styles.width,
                  backgroundColor: styles.backgroundColor,
         marginRight: styles.marginRight,
                 marginLeft: styles.marginLeft,
                 marginTop: styles.marginTop,
                 marginBottom: styles.marginBottom , }}
         className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <LuSeparatorHorizontal className="h-8 w-8"/>
   </div>
   );
}
function FormComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const element = elementInstance as CustomInstance;   
   const {height} = element.extraAttributes;
   const styles = element.styleConfig;

   return (
      <div style={{
         height, 
         width: styles.width,
         backgroundColor: styles.backgroundColor,
         marginRight: styles.marginRight,
                 marginLeft: styles.marginLeft,
                 marginTop: styles.marginTop,
                 marginBottom: styles.marginBottom ,
         }}>
      </div>
   );
}

function PropertiesComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const {updateElement} = useDesigner();
   const element = elementInstance as CustomInstance;
   const form = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
         height: element.extraAttributes.height}
   });

   useEffect(() => { 
      form.reset(element.extraAttributes)
    }, [form, element]);

   function applyChanges(values: propertiesFormSchemaType) {
      const { height} = values;

      updateElement(element.id, {
         ...element,
         extraAttributes: { height }
      })
   }

   return <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)} 
            className="space-y-3" 
            onSubmit={(e) => {
               e.preventDefault(); }} >
                  
         <FormField control={form.control} name="height" render={({field}) => (
            <FormItem >
               <FormLabel>Height (px): {form.watch("height")}, px</FormLabel>
               <FormControl className="pt-2">
                  <Slider  defaultValue={[field.value]} 
                           min={5} max={500} step={1}
                           onValueChange={(value) => {
                              field.onChange(value[0]) }} />
               </FormControl>

               <FormDescription>
                  Пространство формы. <br/> Настраиваемое свободное пространство между элементами формы.
               </FormDescription>
               <FormMessage />
            </FormItem>
         )} />

         {/* <FormField control={form.control} name="required" render={({field}) => (
            <FormItem className="flex flex-center justify-between rounded-lg border p-3 shadow-sm">
               <div className="space-y-0.5">
                  <FormLabel>Required</FormLabel>

                  <FormDescription>
                     The helper text of the field. <br/>
                     It will be displayed below the field.
                  </FormDescription>
               </div>
               <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
               </FormControl>
               <FormMessage />
            </FormItem>
         )} /> */}

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
            className="flex flex-row items-center justify-center gap-x-5"
            onSubmit={(e) => { e.preventDefault(); }} >

            <BackgroundColorControl control={formStyles.control} />

            <div className='border-l-[1px] border-foreground h-[30px]' />

            <WidthControl control={formStyles.control} />

            <div className='border-l-[1px] border-foreground h-[30px]' />


            <div className="flex flex-row items-center  space-x-6">
               
               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginTopControl control={formStyles.control} />
                  <MarginBottomControl control={formStyles.control} />
               </div>
               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginLeftControl control={formStyles.control} />
                  <MarginRightControl control={formStyles.control} />
               </div>
            </div>


         </form>
      </Form>

   </div>);
}



