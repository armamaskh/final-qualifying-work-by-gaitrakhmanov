"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import {  z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../../hooks/useDesigner";

import { Form } from '../ui/form'
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { BackgroundColorControl, BorderColorControl, BorderStyleControl, BorderWidthControl, HeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, OpacityControl, WidthControl } from "./FormFieldStyles/StylesFormFieldProps";

const type: ElementsType = "SeparatorField";


const styleConfig: stylesFormSchemaType = {
   height: '1px',
   width: '100%',
   backgroundColor: 'var(--transparent)',
   marginTop: '4px',
   marginBottom: '4px',
       marginLeft: '0px',
    marginRight: '0px',
   borderStyle: 'solid',
   borderColor: '#CCCCCC',
   borderWidth: '1px',
   opacity: 1,
}


const stylesSchema = z.object({
   height: z.string().max(50),
   width: z.string().max(50).optional(),
   backgroundColor: z.string().max(50),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
   borderStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),
   borderColor: z.string().max(50).optional(),
   borderWidth: z.string().max(50).optional(),
   opacity: z.number().min(0).max(1).optional(),
})

type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   styleConfig: typeof styleConfig };

export const SeparatorFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id, 
      type,
      styleConfig }),
   designerBtnElement: {
      icon: RiSeparator,
      label: "Separator Field"},

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (): boolean => true
}

function DesignerComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const element = elementInstance as CustomInstance;
   const styles = element.styleConfig ?? styleConfig;;

   return (
   <div className="flex flex-col gap-2 w-full"
         style={{marginRight: styles.marginRight,
            marginLeft: styles.marginLeft,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom}}>
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator style={{  height: styles.height,
                           width: styles.width,
                           backgroundColor: styles.backgroundColor,
                           borderStyle: styles.borderStyle,
                           borderColor: styles.borderColor,
                           borderWidth: styles.borderWidth,
                           opacity: styles.opacity }}/>
   </div>
   );
}
function FormComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   const element = elementInstance as CustomInstance;
   const styles = element.styleConfig;

   return (<Separator  
      style={{
         height: styles.height,
         width: styles.width,
         backgroundColor: styles.backgroundColor,
         marginRight: styles.marginRight,
         marginLeft: styles.marginLeft,
         marginTop: styles.marginTop,
         marginBottom: styles.marginBottom,
         borderStyle: styles.borderStyle,
         borderColor: styles.borderColor,
         borderWidth: styles.borderWidth,
         opacity: styles.opacity
      }} />);
}
function PropertiesComponent({elementInstance}: {elementInstance: FormElementInstance}) {
   
   return <p>Для {elementInstance.type} нет свойств</p>;
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

            <BackgroundColorControl control={formStyles.control} />

            <div className='border-l-[1px] border-foreground h-[30px]' />

            <div className="flex flex-col py-1 space-y-0.5 ">
               <HeightControl control={formStyles.control} />
               <WidthControl control={formStyles.control} />
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

            <div className="flex flex-col items-center py-1 space-y-0.5">
               <div className="flex flex-row space-x-0.5 items-center">
                  <BorderWidthControl control={formStyles.control} />
                  <BorderColorControl control={formStyles.control} />
               </div>
               <BorderStyleControl control={formStyles.control} />
            </div>

            <div className='border-l-[1px] border-foreground h-[30px]' />

            <OpacityControl control={formStyles.control} />


         </form>
      </Form>

   </div>);
}



