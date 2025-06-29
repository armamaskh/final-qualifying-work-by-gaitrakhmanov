"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
} from '../ui/form';
import { LuHeading1 } from "react-icons/lu";
import { ColorControl, ColumnSpanControl, FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, LetterSpacingControl, LineHeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, TextAlignControl, TextTransformControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "TitleField";

const extraAttributes = {
   title: "Title field"
}

const propertiesSchema = z.object({
   title: z.string().min(2).max(200)
})

const styleConfig: stylesFormSchemaType = {
   fontFamily: 'Times New Roman',
   fontSize: 24,
   fontWeight: 'bold',
   fontStyle: 'normal',
   color: 'var(--foreground)',
   textAlign: 'center',
   lineHeight: '1.2',
   marginTop: '8px',
   marginBottom: '12px',
   marginLeft: '1px',
   marginRight: '1px',
   textTransform: 'none',
   letterSpacing: '0.5px',
   columnSpan: 'none',
   textDecoration: "none" }

const stylesSchema = z.object({
   fontFamily: z.string().max(100),
   fontSize: z.number().min(1).max(120),
   fontWeight: z.string().max(50),
   fontStyle: z.string().max(50),
   color: z.string().max(50),
   textAlign: z.enum(['left', 'center', 'right']),
   lineHeight: z.string().max(50),
   marginTop: z.string().max(50).optional(),
   marginBottom: z.string().max(50).optional(),
   marginLeft: z.string().max(50).optional(),
   marginRight: z.string().max(50).optional(),
   textTransform: z.string().max(50).optional(),
   letterSpacing: z.string().max(50).optional(),
   textDecoration: z.string().max(50).optional(),
   columnSpan: z.enum(['none', 'all']).optional()
})


export const TitleFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig
   }),
   designerBtnElement: {
      icon: LuHeading1,
      label: "Title Field"
   },

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
   styleConfig: typeof styleConfig
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const element = elementInstance as CustomInstance;
   const { title } = element.extraAttributes;
   const styles = element.styleConfig;


   return (
      <div className="flex flex-col gap-2 w-full"
         style={{
            marginRight: styles.marginRight,
            marginLeft: styles.marginLeft,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom
         }}>
         <Label className="text-muted-foreground">Title field</Label>
         <p style={{
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            fontStyle: styles.fontStyle,
            color: styles.color,
            textAlign: styles.textAlign,
            lineHeight: styles.lineHeight,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom,
            textTransform: styles.textTransform as React.CSSProperties['textTransform'],
            letterSpacing: styles.letterSpacing,
            textDecoration: styles.textDecoration,
            columnSpan: styles.columnSpan as React.CSSProperties['columnSpan']
         }
         }
            className="text-xl">
            {title}
         </p>
      </div>
   );
}
function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const element = elementInstance as CustomInstance;
   const { title } = element.extraAttributes;
   const styles = element.styleConfig;


   return (
      <p style={{
         fontFamily: styles.fontFamily,
         fontSize: styles.fontSize,
         fontWeight: styles.fontWeight,
         fontStyle: styles.fontStyle,
         color: styles.color,
         textAlign: styles.textAlign,
         lineHeight: styles.lineHeight,
         marginRight: styles.marginRight,
         marginLeft: styles.marginLeft,
         marginTop: styles.marginTop,
         marginBottom: styles.marginBottom,
         textTransform: styles.textTransform as React.CSSProperties['textTransform'],
         letterSpacing: styles.letterSpacing,
         textDecoration: styles.textDecoration,
         columnSpan: styles.columnSpan as React.CSSProperties['columnSpan']
      }}
         className="text-xl">
         {title}
      </p>);
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement } = useDesigner();
   const element = elementInstance as CustomInstance;

   const formProps = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: { ...element.extraAttributes }
   });

   useEffect(() => {
      formProps.reset(element.extraAttributes);
   }, [element, formProps]);

   function applyChangesProps(values: propertiesFormSchemaType) {
      const { title } = values;
      updateElement(element.id, {
         ...element,
         extraAttributes: { title }
      });
   }


   return (

      <div>

         <Form {...formProps}>
            <form onBlur={() => { formProps.handleSubmit(applyChangesProps)() }}
               className="space-y-3"
               onSubmit={(e) => {
                  e.preventDefault();
               }} >
               <FormField control={formProps.control} name="title" render={({ field }) => (
                  <FormItem>
                     <FormLabel>Title</FormLabel>
                     <FormControl>
                        <Input {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }} />
                     </FormControl>

                     <FormDescription>
                        Заголовок формы.
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
            className="flex flex-row items-center gap-x-5"
            onSubmit={(e) => { e.preventDefault(); }} >

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
                  <TextTransformControl control={formStyles.control} />


               </div>

               <div className="flex flex-col py-1 space-y-0.5 ">
                  <LetterSpacingControl control={formStyles.control} />
                  <FontWeightControl control={formStyles.control} />
               </div>

               <div className="flex flex-col py-1 space-y-0.5 ">
               </div>
            </div>

            <div className='border-l-[1px] border-foreground h-[30px]' />

            <div className="flex flex-col py-1 space-y-0.5 ">
               <TextAlignControl control={formStyles.control} />
               <ColumnSpanControl control={formStyles.control} />
            </div>


            <div className='border-l-[1px] border-foreground h-[30px]' />



            <div className="flex flex-col py-1 space-y-0.5 justify-center">
               <LineHeightControl control={formStyles.control} />
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



         </form>
      </Form>

   </div>);
}



