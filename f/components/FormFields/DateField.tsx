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
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { BackgroundColorControl, BorderControl, ColorControl, DateFormatControl, FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, HeightControl, LetterSpacingControl, LocaleControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, PaddingControl, TextAlignControl, TextDecorationControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "DateField";

const extraAttributes = {
   label: "Date field",
   helperText: "Pick a date",
   required: false
}

const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   helperText: z.string().max(200),
   required: z.boolean()
})

const styleConfig: stylesFormSchemaType = {
   fontFamily: 'Helvetica',
   fontSize: 12,
   fontWeight: 'normal',
   fontStyle: 'normal',
   color: 'var(--foreground)',
   textAlign: 'left',
   height: '20px',
   border: 'none',
   backgroundColor: 'var(--transparent)',
   padding: '4px',
   marginTop: '4px',
   marginBottom: '4px',
       marginLeft: '0px',
    marginRight: '0px',
   letterSpacing: 'normal',
   textDecoration: 'none',
   dateFormat: 'DD.MM.YYYY',
   locale: 'ru-RU', }

const stylesSchema = z.object({
   fontFamily: z.string().max(100),
   fontSize: z.number().min(1).max(120),
   fontWeight: z.string().max(50),
   fontStyle: z.string().max(50),
   color: z.string().max(50),
   textAlign: z.enum(['left', 'center', 'right']),
   lineHeight: z.string().max(50).optional(),
   height: z.string().max(50).optional(),
   border: z.string().max(50).optional(),
   backgroundColor: z.string().max(50).optional(),
   padding: z.string().max(50).optional(),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
   letterSpacing: z.string().max(50).optional(),
   textDecoration: z.string().max(50).optional(),
   dateFormat: z.string().max(50).optional(),
   locale: z.string().max(50).optional() })

export const DateFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig }),

   designerBtnElement: {
      icon: BsFillCalendarDateFill,
      label: "Date Field" },

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
      const element = formElement as CustomInstance;
      if (element.extraAttributes.required) {
         return currentValue.length > 0;
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
   const styles = element.styleConfig;

   return (
      <div className="flex flex-col gap-2 w-full min-w-0"
                    style={{marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom}} >
         <Label className="">
            {label}
            {required && "*"}
         </Label>
         <Button variant="outline" 
                 className="min-w-0 shrink justify-start text-left font-normal"
                 style={{
                           fontFamily: styles.fontFamily,
                           fontSize: styles.fontSize,
                           fontWeight: styles.fontWeight,
                           fontStyle: styles.fontStyle,
                           color: styles.color,
                           textAlign: styles.textAlign,
                           height: styles.height,
                           border: styles.border,
                           backgroundColor: styles.backgroundColor,
                           padding: styles.padding,
                           letterSpacing: styles.letterSpacing,
                           textDecoration: styles.textDecoration,
                       }}>
            <span>Pick a date</span>
         </Button>
         {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
      </div>
   );
}
function FormComponent({ elementInstance,
   submitValue,
   isInvalid,
   defaultValue }: {
      elementInstance: FormElementInstance,
      submitValue?: SubmitFunction,
      isInvalid?: boolean,
      defaultValue?: string
   }) {
   const element = elementInstance as CustomInstance;
   const styles = element.styleConfig;

   const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);

   const [error, setError] = useState(false);

   useEffect(() => {
      setError(isInvalid === true)
   }, [isInvalid])

   const { label, helperText, required } = element.extraAttributes;

   return (
      <div className="flex flex-col gap-2 w-full"
            style={{marginRight: styles.marginRight,
               marginLeft: styles.marginLeft,
               marginTop: styles.marginTop,
               marginBottom: styles.marginBottom}}>
         <Label className={cn(error && "text-red-400")}>
            {label}
            {required && "*"}
         </Label>
         <Popover>
            <PopoverTrigger asChild>
               <Button variant="outline"
                       className={cn("w-full justify-start text-left font-normal",
                                     !date && "text-muted-foreground",
                                     error && "border-red-400")}
                       style={{
                           fontFamily: styles.fontFamily,
                           fontSize: styles.fontSize,
                           fontWeight: styles.fontWeight,
                           fontStyle: styles.fontStyle,
                           color: styles.color,
                           textAlign: styles.textAlign,
                           height: styles.height,
                           border: styles.border,
                           backgroundColor: styles.backgroundColor,
                           padding: styles.padding,
                           letterSpacing: styles.letterSpacing,
                           textDecoration: styles.textDecoration,
                       }}>
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar mode="single" selected={date}
                  onSelect={date => {
                     setDate(date);
                     if (!submitValue) return;
                     const value = date?.toUTCString() || "";
                     const valid = DateFieldFormElement.validate(element, value);
                     setError(!valid);
                     submitValue(element.id, value);
                  }}
                  initialFocus />
            </PopoverContent>
         </Popover>
         {helperText &&
            <p className={cn("text-muted-foreground text-[0.8rem]",
               error && "text-red-400")}>
               {helperText}
            </p>
         }
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
         ...element.extraAttributes}
   });

   useEffect(() => {
      formProps.reset(element.extraAttributes);
   }, [element, formProps]);

   function applyChangesProps(values: propertiesFormSchemaType) {
      const { label, helperText, required } = values;
      updateElement(element.id, {
         ...element,
         extraAttributes: { label, helperText, required }
      });
   }


   return (
      <div>

         <Form {...formProps}>
            <form onBlur={ () => formProps.handleSubmit(applyChangesProps)() }
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

            <div className="flex flex-row gap-x-5 mb-[0px] items-center">

               <div className="flex flex-col py-1 space-y-1.5">
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
                     <TextDecorationControl control={formStyles.control} />
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <LetterSpacingControl control={formStyles.control} />
                     <FontWeightControl control={formStyles.control} />
                  </div>


               </div>


               <div className='border-l-[1px] border-foreground h-[30px]' />

               <TextAlignControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[30px]' />


               <div className="flex flex-col py-1 space-y-0.5 justify-center">
                  <HeightControl control={formStyles.control} />
                  <PaddingControl control={formStyles.control} />
               </div>

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

               <div className="flex flex-col justify-center py-1 space-y-0.5 ">
                  <BorderControl control={formStyles.control} />
                  <BackgroundColorControl control={formStyles.control} />
               </div>

            </div>

            <div className='border-b-[1px] border-foreground w-full' />

            <div className="flex flex-row justify-center items-center gap-x-5  -mt-[2px]">
               <DateFormatControl control={formStyles.control} />
               <div className='border-l-[1px] border-foreground h-[15px]' />
               <LocaleControl control={formStyles.control} />
            </div>

         </form>
      </Form>

   </div>);
}


