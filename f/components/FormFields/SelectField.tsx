"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {  z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../../hooks/useDesigner";
import {RxDropdownMenu} from "react-icons/rx"

import { Form, 
         FormControl, 
         FormDescription, 
         FormField, 
         FormItem, 
         FormLabel, 
         FormMessage } from '../ui/form'
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";
import { BackgroundColorControl, BorderControl, ColorControl,  FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, HeightControl, MarginBottomControl,  MarginLeftControl, MarginRightControl, MarginTopControl, OptionFontFamilyControl, OptionFontSizeControl,  PaddingControl, TextAlignControl, TextOverflowControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "SelectField";

const extraAttributes = {
   label: "Select field",
   helperText: "Helper text",
   required: false,
   placeHolder: "Value here...",
   options: []
 }

const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   helperText: z.string().max(200),
   required: z.boolean(),
   placeHolder: z.string().max(500),
   options: z.array(z.string()) })


const styleConfig: stylesFormSchemaType = {
   fontFamily: 'Helvetica',
   fontSize: 12,
   fontWeight: 'normal',
   fontStyle: 'normal',
   height: '20px',
   color: 'var(--foreground)',
   textAlign: 'left',
   padding: '4px',
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '0px',
    marginRight: '0px',
   border: 'none',
   backgroundColor: 'var(--transparent)',
   optionFontSize: 12,
   optionFontFamily: 'Helvetica',
   textOverflow: 'ellipsis' }

const stylesSchema = z.object({
   fontFamily: z.string().max(100),
   fontSize: z.number().min(1).max(120),
   fontWeight: z.string().max(50),
   fontStyle: z.string().max(50),
   color: z.string().max(50),
   height:  z.string().max(50),
   textAlign: z.enum(['left', 'center', 'right']),
   padding: z.string().max(50).optional(),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
   border: z.string().max(50).optional(),
   backgroundColor: z.string().max(50).optional(),
   optionFontSize: z.number().min(1).max(120).optional(),
   optionFontFamily: z.string().max(100).optional(),
   textOverflow: z.string().max(50).optional(), })



export const SelectFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id, 
      type, 
      extraAttributes,
      styleConfig }),
   designerBtnElement: {
      icon: RxDropdownMenu,
      label: "Select Field"},

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
      const element = formElement as CustomInstance;
      if(element.extraAttributes.required) {
         return currentValue.length > 0; }
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
   const { label, helperText, required, placeHolder } = element.extraAttributes;
   const styles = element.styleConfig;

   return (
      <div
         className="flex flex-col gap-2 w-full "
         style={{marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom}}>

         <Label >
            {label}
            {required && "*"}
         </Label>

         <Select>
            <SelectTrigger style={{
               fontFamily: styles.optionFontFamily,
               fontSize: `${styles.optionFontSize}px`,
               fontWeight: styles.fontWeight,
               fontStyle: styles.fontStyle,
               color: styles.color,
               height: styles.height,
               textAlign: styles.textAlign,
               padding: styles.padding,


               border: styles.border,
               backgroundColor: styles.backgroundColor,
               textOverflow: styles.textOverflow === 'ellipsis' ? 'ellipsis' : 'clip',
               overflow: 'hidden' }}
               className="w-full min-w-0 flex items-center justify-between " >
               <SelectValue
                  className="flex w-full min-w-0 shrink"
                  placeholder={placeHolder}
                  style={{
                     fontFamily: styles.optionFontFamily || styles.fontFamily,
                     fontSize: `${styles.optionFontSize || styles.fontSize}px`
                  }} />
            </SelectTrigger>
         </Select>

         {helperText && (
            <p
               className="text-muted-foreground text-[0.8rem]" >
               {helperText}
            </p>
         )}
      </div>
   );
}


function FormComponent({   elementInstance,
                           submitValue,
                           isInvalid,
                           defaultValue}: {  elementInstance: FormElementInstance,
                                             submitValue?: SubmitFunction,
                                             isInvalid?: boolean,
                                             defaultValue?: string }) {
  const element = elementInstance as CustomInstance;
  const styles = element.styleConfig;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const {
    label,
    helperText,
    required,
    placeHolder,
    options
  } = element.extraAttributes;

  return (
    <div className="z-[101] flex flex-col gap-2 w-full"  
         style={{marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom}}>
      <Label 
        className={cn(error && "text-red-400")}
        style={{
          fontFamily: styles.fontFamily,
          fontSize: `${styles.fontSize}px`,
          fontWeight: styles.fontWeight,
          fontStyle: styles.fontStyle,
          color: styles.color,
          textAlign: styles.textAlign,
          padding: styles.padding,
          textOverflow: styles.textOverflow === 'ellipsis' ? 'ellipsis' : 'clip',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }} >
        {label}
        {required && "*"}
      </Label>
      
      <Select  defaultValue={value}
               onValueChange={(value) => {
                  setValue(value);
                  if(!submitValue) return;
                  const valid = SelectFieldFormElement.validate(element, value);
                  setError(!valid);
                  submitValue(element.id, value); }} >
         <SelectTrigger 
          className={cn(
            "w-full flex items-center justify-between",
            error && "border-red-400" )}
          style={{
            fontFamily: styles.optionFontFamily,
            fontSize: `${styles.optionFontSize}px`,
            fontWeight: styles.fontWeight,
            fontStyle: styles.fontStyle,
            height: styles.height,
            color: styles.color,

            padding: styles.padding,
            border: styles.border,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius }} >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        
        <SelectContent
          style={{
            fontFamily: styles.optionFontFamily || styles.fontFamily,
            fontSize: `${styles.optionFontSize || styles.fontSize}px`,
            backgroundColor: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius,}} >
          {options.map((option) => (
            <SelectItem 
              key={option} 
              value={option}
              style={{
                fontFamily: styles.optionFontFamily || styles.fontFamily,
                fontSize: `${styles.optionFontSize || styles.fontSize}px`,
                color: styles.color,
            height: styles.height,
                padding: styles.padding
              }}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {helperText && (
        <p className={cn( "text-muted-foreground text-[0.8rem]",  error && "text-red-400")}>
            {helperText}
        </p>
      )}
    </div>
  );
}


function PropertiesComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const {updateElement, setSelectedElement} = useDesigner();
   const element = elementInstance as CustomInstance;
   const form = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onSubmit",
      defaultValues: {
         label: element.extraAttributes.label,
         helperText: element.extraAttributes.helperText,
         required: element.extraAttributes.required,
         placeHolder: element.extraAttributes.placeHolder,
         options: element.extraAttributes.options }
   });

   useEffect(() => { 
      form.reset(element.extraAttributes)
    }, [form, element]);

   function applyChanges(values: propertiesFormSchemaType) {
      const { label, helperText, required, placeHolder, options} = values;

      updateElement(element.id, {
         ...element,
         extraAttributes: { label, helperText, required, placeHolder, options }
      });

      toast.success("Properties save successfully!")
      setSelectedElement(null);
   }

   return <Form {...form}>
      <form onSubmit={ () =>  form.handleSubmit(applyChanges)()} 
            className="space-y-3" >
         <Button className="w-full hover:cursor-pointer" type="submit">
            Save
         </Button>

         <Separator/>

         <FormField control={form.control} name="label" render={({field}) => (
            <FormItem>
               <FormLabel>Label</FormLabel>
               <FormControl>
                  <Input {...field}
                          onKeyDown={(e) => {
                           if(e.key === "Enter") e.currentTarget.blur();}} />
               </FormControl>

               <FormDescription>
                  Метка поля. <br /> Она будет отображаться над полем.
               </FormDescription>
               <FormMessage />
            </FormItem>
         )} />

         <FormField control={form.control} name="placeHolder" render={({field}) => (
            <FormItem>
               <FormLabel>PlaceHolder</FormLabel>
               <FormControl>
                  <Input {...field}
                          onKeyDown={(e) => {
                           if(e.key === "Enter") e.currentTarget.blur();}} />
               </FormControl>

               <FormDescription>
                  Заполнитель поля.
               </FormDescription>
               <FormMessage />
            </FormItem>
         )} />

         <FormField control={form.control} name="helperText" render={({field}) => (
            <FormItem>
               <FormLabel>Helper Text</FormLabel>
               <FormControl>
                  <Input {...field}
                          onKeyDown={(e) => {
                           if(e.key === "Enter") e.currentTarget.blur();}} />
               </FormControl>

               <FormDescription>
                  Вспомогательный текст поля. <br />
                  Он будет отображен под полем.
               </FormDescription>
               <FormMessage />
            </FormItem>
         )} />
         
         <Separator/>
         <FormField control={form.control} 
                    name="options" 
                    render={({field}) => (
            <FormItem>
               <div className="flex justify-between items-center">
                  <FormLabel>Options</FormLabel>
                  <Button variant="outline" 
                          className="gap-2"
                          onClick={(e) => {
                              e.preventDefault();
                              form.setValue("options", field.value.concat("New option"));
                          }}>
                     <AiOutlinePlus />
                     Add
                  </Button>
               </div>
               <div className="flex flex-col gap-2">
                  {
                     form.watch("options").map( (option, index) => (
                        <div  key={index} className="flex items-center justify-between gap-1" >
                           <Input placeholder="" 
                                  value={option} 
                                  onChange={(e) => {

                                    field.value[index] = e.target.value;
                                    field.onChange(field.value);
                                  }}/>
                           <Button variant="ghost" 
                                   size={"icon"}
                                   onClick={(e) => {
                                    e.preventDefault();
                                    const newOption = [...field.value];
                                    newOption.splice(index, 1);
                                    field.onChange(newOption); }} >
                              <AiOutlineClose />

                           </Button>
                        </div>
                     ) )
                  }
               </div>

               <FormDescription>
                  Добавьте или удалите варианты. <br />
                  Эти опции будут доступны для выбора пользователем.
               </FormDescription>
               <FormMessage />
            </FormItem>
         )} />

         <Separator />         
         <FormField control={form.control} name="required" render={({field}) => (
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
            className="pb-1 space-y-1.5"
            onSubmit={(e) => { e.preventDefault(); }} >


            <div className="flex flex-row items-center gap-x-5 mb-[0px]">

               <div className="flex flex-col py-1 space-y-0.5">
                  <FontFamilyControl control={formStyles.control} />

                  <div className="flex flex-row justify-between ">
                     <FontSizeControl control={formStyles.control} />
                     <ColorControl control={formStyles.control} />
                  </div>
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-row space-x-1.5 items-center">
                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <FontStyleControl control={formStyles.control} />
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <FontWeightControl control={formStyles.control} />
                  </div>

               </div>


               <div className='border-l-[1px] border-foreground h-[30px]' />

               <TextAlignControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[30px]' />




               <div className="flex flex-row space-x-1">

                  <div className="flex flex-col py-1 space-y-0.5 justify-center">
                  <HeightControl control={formStyles.control} />

                     <PaddingControl control={formStyles.control} />
                  </div>
                  <div className="flex flex-col py-1 space-y-0.5">


                  </div>
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-row items-center space-x-1.5">

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


               <div className="flex flex-col justify-center py-1 space-y-0.5 ">
                  <BorderControl control={formStyles.control} />
                  <BackgroundColorControl control={formStyles.control} />
               </div>



            </div>



            <div className='border-b-[1px] border-foreground w-full' />

            <div className="flex flex-row justify-center items-center gap-x-5  -mt-[2px]">
               <OptionFontFamilyControl control={formStyles.control} />


               <div className='border-l-[1px] border-foreground h-[15px]' />

               <OptionFontSizeControl control={formStyles.control} />


               <div className='border-l-[1px] border-foreground h-[15px]' />

               <TextOverflowControl control={formStyles.control} />


            </div>

         </form>
      </Form>

   </div>);
}

