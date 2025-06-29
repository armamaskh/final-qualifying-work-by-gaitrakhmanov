"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";
import { BackgroundColorControl, ColorControl, ColumnGapControl, ColumnsControl, FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, HyphenationControl, LetterSpacingControl, LineBreakControl, LineHeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, OverflowWrapControl, TextAlignControl, TextIndentControl, WhiteSpaceControl, WordSpacingControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
   text: "Text here"
}

const propertiesSchema = z.object({
   text: z.string().min(2).max(5000)
})

const styleConfig: stylesFormSchemaType = {
   fontFamily: 'Helvetica',
   fontSize: 12,
   fontWeight: 'normal',
   fontStyle: 'normal',
   color: 'var(--foreground)',
   textAlign: 'justify',
   lineHeight: '1.6',
   textIndent: '20px',
   marginTop: '8px',
   marginBottom: '8px',
       marginLeft: '0px',
    marginRight: '0px',
   wordSpacing: 'normal',
   letterSpacing: 'normal',
   columns: 1,
   columnGap: '20px',
   hyphens: 'none',
   overflowWrap: 'break-word',
   whiteSpace: 'normal',
   backgroundColor: 'var(--transparent)',
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
   overflowWrap: z.string().max(50).optional(),
   whiteSpace: z.string().max(50).optional(),
   backgroundColor: z.string().max(50).optional(),
   lineBreak: z.enum(['auto', 'strict']).optional(),
})


export const ParagraphFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig
   }),
   designerBtnElement: {
      icon: BsTextParagraph,
      label: "Paragraph Field"
   },

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (): boolean => true }


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   extraAttributes: typeof extraAttributes,
   styleConfig: typeof styleConfig };


function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const element = elementInstance as CustomInstance;
   const { text } = element.extraAttributes;
   const styles = element.styleConfig;

   return (
      <div className="flex flex-col gap-2 w-[100%]"
            style={{marginRight: styles.marginRight,
                  marginLeft: styles.marginLeft,
                  marginTop: styles.marginTop,
                  marginBottom: styles.marginBottom}}>
         <Label className="text-muted-foreground">Paragraph field</Label>
         <p lang="ru" className="overflow-hidden text-ellipsis " 
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
               hyphens: styles.hyphenation as React.CSSProperties['hyphens'],
               overflowWrap: styles.overflowWrap as React.CSSProperties['overflowWrap'],
               whiteSpace: styles.whiteSpace,
               backgroundColor: styles.backgroundColor,
               lineBreak: styles.lineBreak   }}>
            {text}
         </p>
      </div>
   );
}


function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const element = elementInstance as CustomInstance;
   const { text } = element.extraAttributes;
   const styles = element.styleConfig;

   return (
   <p style={{ fontFamily: styles.fontFamily,
               fontSize: styles.fontSize,
               fontWeight: styles.fontWeight,
               fontStyle: styles.fontStyle,
               color: styles.color,
               textAlign: styles.textAlign,
               lineHeight: styles.lineHeight,
               textIndent: styles.textIndent,
               marginRight: styles.marginRight,
                 marginLeft: styles.marginLeft,
                 marginTop: styles.marginTop,
                 marginBottom: styles.marginBottom,  
               wordSpacing: styles.wordSpacing,
               letterSpacing: styles.letterSpacing,
               columns: styles.columns,
               columnGap: styles.columnGap,
               hyphens: styles.hyphenation as React.CSSProperties['hyphens'],
               overflowWrap: styles.overflowWrap as React.CSSProperties['overflowWrap'],
               whiteSpace: styles.whiteSpace,
               backgroundColor: styles.backgroundColor,
               lineBreak: styles.lineBreak   }}
      lang="ru">
      {text}
   </p>);
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
      const { text } = values;
      updateElement(element.id, {
         ...element,
         extraAttributes: { text }
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
               <FormField control={formProps.control} name="text" render={({ field }) => (
                  <FormItem>
                     <FormLabel>Text</FormLabel>
                     <FormControl>
                        <Textarea rows={500}
                           {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }} />
                     </FormControl>

                     <FormDescription>
                        Абзац формы.
                     </FormDescription>
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

            <div className="flex flex-row items-center gap-x-2 mb-[0px]">

               <div className="flex flex-col py-1 space-y-0.5">
                  <FontFamilyControl control={formStyles.control} />

                  <div className="flex flex-row justify-between ">
                     <FontSizeControl control={formStyles.control} />
                     <ColorControl control={formStyles.control} />
                  </div>
               </div>


               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-row space-x-1 items-center">
                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <FontStyleControl control={formStyles.control} />
                     <FontWeightControl control={formStyles.control} />
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <LetterSpacingControl control={formStyles.control} />
                     <WordSpacingControl control={formStyles.control} />
                  </div>


                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <BackgroundColorControl control={formStyles.control} />
                  </div>
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5 ">
                  <TextAlignControl control={formStyles.control} />
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5 justify-center">
                  <LineHeightControl control={formStyles.control} />
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginTopControl control={formStyles.control} />
                  <MarginBottomControl control={formStyles.control} />
               </div>

               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginLeftControl control={formStyles.control} />
                  <MarginRightControl control={formStyles.control} />
               </div>


               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col py-1 space-y-0.5">
                  <ColumnsControl control={formStyles.control} />
                  <ColumnGapControl control={formStyles.control} />
               </div>

            </div>

            <div className='border-b-[1px] border-foreground w-full' />

            <div className="flex flex-row justify-center items-center gap-x-2  -mt-[2px]">
               <TextIndentControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <LineBreakControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[15px]' />

               <OverflowWrapControl control={formStyles.control} />


               <div className='border-l-[1px] border-foreground h-[15px]' />

               <HyphenationControl control={formStyles.control} />
 
               <div className='border-l-[1px] border-foreground h-[15px]' />

               <WhiteSpaceControl control={formStyles.control} />
            </div>


         </form>
      </Form>

   </div>);
}

