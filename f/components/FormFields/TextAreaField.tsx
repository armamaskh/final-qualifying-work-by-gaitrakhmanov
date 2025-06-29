"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
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
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "../ui/textarea";
import { BackgroundColorControl, BorderControl, ColorControl, ColumnGapControl, ColumnsControl, FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, HyphenationControl, LetterSpacingControl, LineBreakControl, LineHeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, OverflowWrapControl, PaddingControl, TextAlignControl, WhiteSpaceControl, WordSpacingControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "TextAreaField";

const extraAttributes = {
   label: "Text area",
   helperText: "Helper text",
   required: false,
   placeHolder: "Value here..."
}

const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   helperText: z.string().max(200),
   required: z.boolean(),
   placeHolder: z.string().max(500),
})

const styleConfig: stylesFormSchemaType = {
   fontFamily: 'Monospace',
   fontSize: 12,
   fontWeight: 'normal',
   fontStyle: 'normal',
   color: 'var(--foreground)',
   textAlign: 'left',
   lineHeight: '1.5',
   textIndent: '0px',
   marginTop: '0px',
   marginBottom: '0px',
   marginLeft: '0px',
   marginRight: '0px',
   wordSpacing: 'normal',
   letterSpacing: 'normal',
   columns: 1,
   columnGap: '12px',
   hyphens: "none",
   backgroundColor: 'var(--transparent)',
   padding: '8px',
   border: 'none',
   whiteSpace: 'pre-line',
   overflowWrap: 'break-word',  
   lineBreak: 'auto',
}

const stylesSchema = z.object({
  fontFamily: z.string().max(100),
  fontSize: z.number().min(1).max(120),
  fontWeight: z.string().max(50),
  fontStyle: z.string().max(50),
  color: z.string().max(50),
  textAlign: z.enum(['left', 'center', 'right', 'justify']),
  lineHeight: z.string().max(50),
  textIndent: z.string().max(50).optional(),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
  wordSpacing: z.string().max(50).optional(),
  letterSpacing: z.string().max(50).optional(),
  columns: z.number().min(1).max(2).optional(),
  columnGap: z.string().max(50).optional(),
  hyphens: z.enum(['none', 'manual', 'auto']).optional(),
  backgroundColor: z.string().max(50).optional(),
  padding: z.string().max(50).optional(),
  border: z.string().max(50).optional(),
  whiteSpace: z.string().max(50).optional(),
  overflowWrap: z.enum(['normal', 'break-word','break-word','anywhere','inherit','revert','initial','unset']).optional(),
   lineBreak: z.enum(['auto', 'strict']).optional() })

export const TextAreaFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig }),
   designerBtnElement: {
      icon: BsTextareaResize,
      label: "TextArea Field"
   },

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
   const { label, helperText, required, placeHolder } = element.extraAttributes;
   const styles = element.styleConfig;


   return (
      <div className="flex flex-col gap-2 w-full"
            style={{
         marginRight: styles.marginRight,
                 marginLeft: styles.marginLeft,
                 marginTop: styles.marginTop,
                 marginBottom: styles.marginBottom }}> 
         <Label className="">
            {label}
            {required && "*"}
         </Label>
         <Textarea 
            readOnly
            disabled
            placeholder={placeHolder}
            style={{ fontFamily: styles.fontFamily,
                     fontSize: styles.fontSize,
                     fontWeight: styles.fontWeight,
                     fontStyle: styles.fontStyle,
                     color: styles.color,
                     textAlign: styles.textAlign,
                     lineHeight: styles.lineHeight,
                     textIndent: styles.textIndent,
                     wordSpacing: styles.wordSpacing,
                     whiteSpace: styles.whiteSpace,
                     lineBreak: styles.lineBreak,
                     letterSpacing: styles.letterSpacing,
                     columns: styles.columns,
                     columnGap: styles.columnGap,
                     hyphens: styles.hyphens,
                     backgroundColor: styles.backgroundColor,
                     padding: styles.padding,
                     border: styles.border,
                     overflowWrap: styles.overflowWrap, }}   />
         {helperText && 
            <p className="text-muted-foreground text-[0.8rem]">
               {helperText}
            </p>}
      </div>);
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
   const [value, setValue] = useState(defaultValue || "");
   const [error, setError] = useState(false);
   const styles = element.styleConfig;
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
         e.preventDefault();
         const textarea = e.currentTarget;
         const start = textarea.selectionStart;
         const end = textarea.selectionEnd;

         const newValue =
            value.substring(0, start) + '    ' +value.substring(end);
         setValue(newValue);

         setTimeout(() => {
            textarea.selectionStart = start + 4;
            textarea.selectionEnd = start + 4;
         }, 0);
      }
   };

   useEffect(() => {
      setError(isInvalid === true)
   }, [isInvalid])
   const { label, helperText, required, placeHolder } = element.extraAttributes;


   return (
      <div className="flex flex-col gap-2 w-full min-w-0"
           style={{
                  marginRight: styles.marginRight,
                 marginLeft: styles.marginLeft,
                 marginTop: styles.marginTop,
                 marginBottom: styles.marginBottom }}>
         <Label className={cn(error && "text-red-400")}>
            {label}
            {required && "*"}
         </Label>
         <Textarea 
            ref={textareaRef}
            className={cn(error && "border-red-400")}
            onKeyDown={handleKeyDown}
            placeholder={placeHolder}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {  if (!submitValue) return;
                              const valid = TextAreaFieldFormElement.validate(element, e.target.value);
                              setError(!valid)
                              if (!valid) return;
                              submitValue(element.id, e.target.value)   }}
            value={value}
            style={{ fontFamily: styles.fontFamily,
                     fontSize: styles.fontSize,
                     fontWeight: styles.fontWeight,
                     fontStyle: styles.fontStyle,
                     color: styles.color,
                     textAlign: styles.textAlign,
                     lineHeight: styles.lineHeight,
                     textIndent: styles.textIndent,
                     wordSpacing: styles.wordSpacing,
                     letterSpacing: styles.letterSpacing,
                     columns: styles.columns,
                     columnGap: styles.columnGap,
                     hyphens: styles.hyphens,
                     backgroundColor: styles.backgroundColor,
                     padding: styles.padding,
                     border: styles.border,
                     whiteSpace: styles.whiteSpace,
                     lineBreak: styles.lineBreak, 
                     overflowWrap: styles.overflowWrap,}}   />
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
         ...element.extraAttributes
      }
   });

   useEffect(() => {
      formProps.reset(element.extraAttributes);
   }, [element, formProps]);

   function applyChangesProps(values: propertiesFormSchemaType) {
      const { label, helperText, required, placeHolder } = values;
      updateElement(element.id, {
         ...element,
         extraAttributes: { label, helperText, required, placeHolder }
      });
   }


   return (
      <div>
         <Form {...formProps}>
            <form onBlur={() => formProps.handleSubmit(applyChangesProps)()}
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

               <FormField control={formProps.control} name="placeHolder" render={({ field }) => (
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

      </div>);

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
            className="pb-1 space-y-1.5 "
            onSubmit={(e) => { e.preventDefault(); }} >

            <div className="flex flex-row items-center justify-center gap-x-2.5 mb-[0px]">


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
                     <FontWeightControl control={formStyles.control} />
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <WordSpacingControl control={formStyles.control} />
                     <LetterSpacingControl control={formStyles.control} />
                  </div>


                  <div className="flex flex-col py-1 space-y-0.5 ">
                  </div>
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5 ">
                  <TextAlignControl control={formStyles.control} />
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5 justify-center">
                  <LineHeightControl control={formStyles.control} />
                  <BackgroundColorControl control={formStyles.control} />

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

               <div className="flex flex-col py-1 space-y-0.5">
                  <ColumnsControl control={formStyles.control} />
                  <ColumnGapControl control={formStyles.control} />
               </div>

            </div>

            <div className='border-b-[1px] border-foreground w-full' />

            <div className="flex flex-row justify-center items-center gap-x-2.5 -mt-[2px]">

               <LineBreakControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <HyphenationControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <OverflowWrapControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <WhiteSpaceControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <PaddingControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <BorderControl control={formStyles.control} />


            </div>


         </form>
      </Form>

   </div>);
}


