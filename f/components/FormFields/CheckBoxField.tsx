"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../../hooks/useDesigner";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '../ui/form'
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { IoMdCheckbox } from "react-icons/io"
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BackgroundColorControl, BorderControl,  MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "CheckBoxField";

const extraAttributes = {
   label: "CheckBox field",
   helperText: "Helper text",
   required: false,
}

const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   helperText: z.string().max(200),
   required: z.boolean() })

const styleConfig: stylesFormSchemaType = {
   size: '14px',
   border: 'none',
   backgroundColor: 'var(--transparent)',
   checkColor: '#000000',
   checkedBackgroundColor: '#E0E0E0',
   marginTop: '4px',
   marginBottom: '4px',
   marginRight: '8px',
   marginLeft: '8px',
   labelFontFamily: 'Helvetica',
   labelFontSize: 14,
   labelFontStyle: "normal",
   labelFontWeight: 'normal',
   labelColor: 'var(--foreground)',
   labelTextAlign: 'left' }

const stylesSchema = z.object({
   size: z.string().max(50),
   border: z.string().max(50).optional(),
   backgroundColor: z.string().max(50).optional(),
   checkColor: z.string().max(50).optional(),
   checkedBackgroundColor: z.string().max(50).optional(),
   marginTop: z.string().max(50).optional(),
   marginBottom: z.string().max(50).optional(),
   marginLeft: z.string().max(50).optional(),
   marginRight: z.string().max(50).optional(),
   labelFontFamily: z.string().max(100).optional(),
   labelFontSize: z.number().min(1).max(120).optional(),
   labelFontStyle: z.string().max(50).optional(),
   labelFontWeight: z.string().max(50).optional(),
   labelColor: z.string().max(50).optional(),
   labelTextAlign: z.enum(['left', 'center', 'right', 'justify', 'start', 'end']).optional()
})


export const CheckBoxFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig }),

   designerBtnElement: {
      icon: IoMdCheckbox,
      label: "CheckBox Field" },

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
      const element = formElement as CustomInstance;
      if (element.extraAttributes.required) {
         return currentValue === "true";
      }
      return true

   },
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   extraAttributes: typeof extraAttributes,
   styleConfig: typeof styleConfig };

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  const styles = element.styleConfig;

  return (
    <div className="flex items-top space-x-2"
         style={{ marginRight: styles.marginRight,
                  marginLeft: styles.marginLeft,
                  marginTop: styles.marginTop,
                  marginBottom: styles.marginBottom}}>
      <Checkbox 
        id={id}
        style={{  width: styles.size,
                  height: styles.size,
                  border: styles.border,
                  backgroundColor: styles.backgroundColor,
                  color: styles.checkColor,
                  '--checked-background': styles.checkedBackgroundColor,
                  '--checked-color': styles.checkColor } as React.CSSProperties}
        className="data-[state=checked]:bg-[var(--checked-background)] data-[state=checked]:text-[var(--checked-color)]" />
      
      <div  className="grid gap-1.5 leading-none" >
        <Label 
          htmlFor={id}
          style={{ fontFamily: styles.labelFontFamily,
                   fontSize: `${styles.labelFontSize}px`,
                   fontStyle: styles.labelFontStyle,
                   fontWeight: styles.labelFontWeight,
                   color: styles.labelColor,
                   textAlign: styles.labelTextAlign as React.CSSProperties['textAlign'] }}
          className="[&>span]:font-inherit [&>span]:text-inherit" >
          {label}
          {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]" >
                           {helperText}
                        </p>)
         }
      </div>
    </div>
  );
}



function FormComponent({   elementInstance,
                           submitValue,
                           isInvalid,
                           defaultValue }: { elementInstance: FormElementInstance,
                                             submitValue?: SubmitFunction,
                                             isInvalid?: boolean,
                                             defaultValue?: string }) {
   const element = elementInstance as CustomInstance;
   const styles = element.styleConfig;
   const [value, setValue] = useState<boolean>(defaultValue === "true" ? true : false);
   const [error, setError] = useState(false);

   useEffect(() => {
      setError(isInvalid === true)
   }, [isInvalid])

   const { label, helperText, required } = element.extraAttributes;
   const id = `checkbox-${element.id}`;

   return (
      <div  className="flex items-top space-x-2"
            style={{ marginRight: styles.marginRight,
                  marginLeft: styles.marginLeft,
                  marginTop: styles.marginTop,
                  marginBottom: styles.marginBottom}}>
         <Checkbox id={id}
                    style={{  width: styles.size,
                              height: styles.size,
                              border: styles.border,
                              backgroundColor: styles.backgroundColor,
                              color: styles.checkColor,
                              '--checked-background': styles.checkedBackgroundColor,
                              '--checked-color': styles.checkColor } as React.CSSProperties}
            checked={value}
            className={cn( "data-[state=checked]:bg-[var(--checked-background)]",
                           "data-[state=checked]:text-[var(--checked-color)]",
                           error && "border-red-400")}
            onCheckedChange={(checked) => {
               let value = false;
               if (checked === true) value = true;

               setValue(value);
               if (!submitValue) return;
               const stringValue = value ? "true" : "false";
               const valid = CheckBoxFieldFormElement.validate(element, stringValue);
               setError(!valid);
               submitValue(element.id, stringValue); }} />
         <div className="grid gap-1.5 leading-none" >
            <Label htmlFor={id}
                   style={{   fontFamily: styles.labelFontFamily,
                              fontSize: `${styles.labelFontSize}px`,
                              fontStyle: styles.labelFontStyle,
                              fontWeight: styles.labelFontWeight,
                              color: styles.labelColor,
                              textAlign: styles.labelTextAlign as React.CSSProperties['textAlign'] }}
                   className={cn(error && "border-red-400")}>
               {label}
               {required && "*"}
            </Label>
            {helperText && <p className={cn("text-muted-foreground text-[0.8rem]",
                                             error && "text-red-400")}>
                              {helperText}
                           </p>}
         </div>

      </div>
   );
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement } = useDesigner();
   const element = elementInstance as CustomInstance;
   const formProps = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
         ...element.extraAttributes }
   });


   useEffect(() => {
      formProps.reset(element.extraAttributes);
   }, [element, formProps]);

   function applyChanges(values: propertiesFormSchemaType) {
      console.log("111");
      const { label, helperText, required } = values;
      updateElement(element.id, {
         ...element,
         extraAttributes: { label, helperText, required }
      });
   }

   return (
      <div>

         <Form {...formProps}>
            <form onBlur={ () => formProps.handleSubmit(applyChanges)() }
               className="space-y-3"
               onSubmit={(e) => {
                  e.preventDefault();
               }} >
               <FormField control={formProps.control} name="label" render={({ field }) => (
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

               <FormField control={formProps.control} name="helperText" render={({ field }) => (
                  <FormItem>
                     <FormLabel>Helper Text</FormLabel>
                     <FormControl>
                        <Input {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }} />
                     </FormControl>

                     <FormDescription>
                        Вспомогательный текст поля. <br />
                        Он будет отображен под полем.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )} />

               <FormField control={formProps.control} name="required" render={({ field }) => (
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

      </div>
   );
}

function StylesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement } = useDesigner();
   const element = elementInstance as CustomInstance;

   const formStyles = useForm<stylesFormSchemaType>({
      resolver: zodResolver(stylesSchema),
      mode: "onBlur",
      defaultValues: element.styleConfig  });

   useEffect(() => {
      formStyles.reset(element.styleConfig)
   }, [element, formStyles]);

   function applyChangesStyles(values: stylesFormSchemaType) {
      updateElement(element.id, {
         ...element,
         styleConfig: values });
   };

   return (<div className="">
      <Form {...formStyles}>
         <form onBlur={() => formStyles.handleSubmit(applyChangesStyles)()}
            className="flex flex-row items-center justify-center gap-x-5"
            onSubmit={(e) => { e.preventDefault(); }} >

            <div className="flex flex-col py-1 space-y-0.5">

               <FormField control={formStyles.control}
                  name="labelFontFamily"
                  render={({ field }) => (
                     <FormItem className="flex items-center ">
                        <FormLabel>Шрифт:</FormLabel>
                        <FormControl>
                           <Select {...field} onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
                                 <SelectValue placeholder="Select font" />
                              </SelectTrigger>
                              <SelectContent className="!w-[120px]">
                                 <SelectItem value="Helvetica">Helvetica</SelectItem>
                                 <SelectItem value="Arial">Arial</SelectItem>
                                 <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                 <SelectItem value="Courier New">Courier New</SelectItem>
                                 <SelectItem value="Monospace">Monospace</SelectItem>
                              </SelectContent>
                           </Select>
                        </FormControl>
                     </FormItem>)} />

               <div className="flex flex-row justify-between ">

                  <FormField control={formStyles.control}
                     name="labelFontSize"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormLabel>Аа:</FormLabel>
                           <FormControl>
                              <Input  {...field}
                                 className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
                                 type="number"
                                 min="1"
                                 max="120"
                                 value={field.value}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                 }} />
                           </FormControl>
                        </FormItem>)} />
                  <FormField control={formStyles.control}
                     name="labelColor"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormControl>
                              <Input
                                 {...field}
                                 type="color"
                                 className="bg-foreground/5 rounded-[8px] !h-[20px] w-10 px-0 py-0"
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                 }} />
                           </FormControl>
                        </FormItem>)} />
               </div>
            </div>




            <div className='border-l-[1px] border-foreground h-[30px]' />

            <div className="flex flex-row space-x-1.5 items-center">

               <div className="flex flex-col py-1 space-y-0.5 ">
                  
                  <FormField control={formStyles.control}
                     name="labelFontStyle"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormLabel>Стиль:</FormLabel>
                           <FormControl>
                              <Select {...field} onValueChange={field.onChange} value={field.value}>
                                 <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
                                    <SelectValue placeholder="Select style" />
                                 </SelectTrigger>
                                 <SelectContent className="!w-[120px]">
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="italic">Italic</SelectItem>
                                    <SelectItem value="oblique">Oblique</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                        </FormItem>)} />

               </div>

               <div className="flex flex-col py-1 space-y-0.5 ">
                  

                  <FormField control={formStyles.control}
                     name="labelFontWeight"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormLabel>Жирность:</FormLabel>
                           <FormControl>
                              <Select {...field} onValueChange={field.onChange} value={field.value}>
                                 <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
                                    <SelectValue placeholder="Select weight" />
                                 </SelectTrigger>
                                 <SelectContent className="!w-[120px]">
                                    <SelectItem value="100">Thin</SelectItem>
                                    <SelectItem value="200">Extra Light</SelectItem>
                                    <SelectItem value="300">Light</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="500">Medium</SelectItem>
                                    <SelectItem value="600">Semi Bold</SelectItem>
                                    <SelectItem value="bold">Bold</SelectItem>
                                    <SelectItem value="800">Extra Bold</SelectItem>
                                    <SelectItem value="900">Black</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                        </FormItem>)} />
               </div>
            </div>

            <div className='border-l-[1px] border-foreground h-[30px]' />

            <FormField control={formStyles.control}
               name="labelTextAlign"
               render={({ field }) => (
                  <FormItem className="flex items-center ">
                     <FormLabel>Выравнивание:</FormLabel>
                     <FormControl>
                        <Select {...field} onValueChange={field.onChange} value={field.value}>
                           <SelectTrigger className="bg-foreground/5 rounded-[8px] w-fit !h-[20px] pl-2 pr-0 py-0 text-xs">
                              <SelectValue placeholder="Select alignment" />
                           </SelectTrigger>
                           <SelectContent className="!w-[120px]">
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                              <SelectItem value="justify">Justify</SelectItem>
                              <SelectItem value="start">Start</SelectItem>
                              <SelectItem value="end">End</SelectItem>
                           </SelectContent>
                        </Select>
                     </FormControl>
                  </FormItem>)} />


            <div className='border-l-[1px] border-foreground h-[30px]' />


            <div className="flex flex-col py-1 space-y-0.5">
               <MarginTopControl control={formStyles.control} />
               <MarginBottomControl control={formStyles.control} />
            </div>
            <div className="flex flex-col py-1 space-y-0.5 ">
               <MarginLeftControl control={formStyles.control} />
               <MarginRightControl control={formStyles.control} />
            </div>



            <div className='border-l-[1px] border-foreground h-[30px]' />


            <div className="flex flex-row space-x-1.5 items-center">

               <FormField control={formStyles.control}
                  name="size"
                  render={({ field }) => (
                     <FormItem className="flex items-center ">
                        <FormLabel>Размер метки:</FormLabel>
                        <FormControl>
                           <Input {...field}
                              className="bg-foreground/5 rounded-[8px] !h-[20px] w-12 pl-2 pr-0 py-0 text-xs text-center"
                              type="number" min="1" max="500"
                              value={ parseFloat(field.value) || ""}
                              placeholder="20px"
                              onChange={(e) =>
                                 field.onChange((e.target.value) ? `${e.target.value}px` : "")}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter') e.currentTarget.blur();
                              }} />
                        </FormControl>
                     </FormItem>)} />


               <div className="flex flex-col py-1 space-y-0.5 ">
                  <FormField control={formStyles.control}
                     name="checkColor"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormLabel>Цвет метки:</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="color"
                                 className="bg-foreground/5 rounded-[8px] !h-[20px] w-5 px-0 py-0"
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                 }} />
                           </FormControl>
                        </FormItem>)} />

                  <FormField control={formStyles.control}
                     name="checkedBackgroundColor"
                     render={({ field }) => (
                        <FormItem className="flex items-center ">
                           <FormLabel>Цвет ячейки:</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="color"
                                 className="bg-foreground/5 rounded-[8px] !h-[20px] w-5 px-0 py-0"
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                 }} />
                           </FormControl>
                        </FormItem>)} />
               </div>
            </div>


            <div className='border-l-[1px] border-foreground h-[30px]' />


            <div className="flex flex-col py-1 space-y-0.5 ">
               <BorderControl control={formStyles.control} />
               <BackgroundColorControl control={formStyles.control} />
            </div>
               

         </form>
      </Form>

   </div>);
}





