import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { FaTableCellsLarge } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useDesigner from "../../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { BackgroundColorControl, BorderControl, ColorControl, FontFamilyControl, FontSizeControl, FontStyleControl, FontWeightControl, MarginBottomControl, MarginLeftControl, MarginRightControl, MarginTopControl, PaddingControl, TextAlignControl } from "./FormFieldStyles/StylesFormFieldProps";
import { Label } from "../ui/label";


const type: ElementsType = "TableField";


const extraAttributes: propertiesFormSchemaType = {
   label: "Table Field",
   helperText: "Helper text",
   rows: 1,
   headers: [] as string[],
   required: false   };
const propertiesSchema = z.object({
   label: z.string().min(2).max(50),
   helperText: z.string().max(200),
   rows: z.number().min(1).max(10),
   headers: z.array(z.string().max(50)).optional(),
   required: z.boolean()   })

const styleConfig: stylesFormSchemaType = {
   fontFamily: "Helvetica",
   fontSize: 12,
   fontWeight: "normal",
   fontStyle: "normal",
   color: "var(--foreground)",
   textAlign: "left",
   padding: "4px",
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '0px',
    marginRight: '0px',
   border: "1px solid var(--border)",
   backgroundColor: "var(--transparent)"
};


const stylesSchema = z.object({
   fontFamily: z.string().max(100).optional(),
   fontSize: z.number().min(1).max(120).optional(),
   fontWeight: z.string().max(50).optional(),
   fontStyle: z.string().max(50).optional(),
   color: z.string().max(50).optional(),
   textAlign: z.enum(['left', 'center', 'right']).optional(),
   padding: z.string().max(50).optional(),
  marginTop: z.string().max(50).optional(),
  marginBottom: z.string().max(50).optional(),
  marginLeft: z.string().max(50).optional(),
  marginRight: z.string().max(50).optional(),
   border: z.string().max(50).optional(),
   backgroundColor: z.string().max(50).optional()
})


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
type stylesFormSchemaType = z.infer<typeof stylesSchema>;
type CustomInstance = FormElementInstance & {
   extraAttributes: typeof extraAttributes,
   styleConfig: typeof styleConfig
};


export const TableFieldFormElement: FormElement = {
   type,
   construct: (id: string) => ({
      id,
      type,
      extraAttributes,
      styleConfig
   }),

   designerBtnElement: {
      icon: FaTableCellsLarge,
      label: "Table Field"
   },

   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
   stylesComponent: StylesComponent,

   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
      const element = formElement as CustomInstance;
      if (element.extraAttributes.required) {
         const tableData = JSON.parse(currentValue);
         return Array.isArray(tableData) && tableData.length > 0;
      }
      return true
   },
}


function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const element = elementInstance as CustomInstance;
   const { label, helperText, rows, headers = [], required } = element.extraAttributes;
   const styles = element.styleConfig;

   return (
      <div className="flex flex-col gap-2 w-full"
           style={{marginRight: styles.marginRight,
                        marginLeft: styles.marginLeft,
                        marginTop: styles.marginTop,
                        marginBottom: styles.marginBottom}}>

         <Label >
            {label}{required && '*'}
         </Label>

         <table style={{ border: styles.border, 
                         backgroundColor: styles.backgroundColor }}>
            <thead>
               <tr>
                  {headers.map((header, index) => (
                     <th key={index}
                        style={{
                           fontFamily: styles.fontFamily,
                           fontSize: `${styles.fontSize}px`,
                           padding: styles.padding,
                           textAlign: styles.textAlign
                        }} >
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {Array.from({ length: rows }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                     {headers.map((_, colIndex) => (
                        <td key={colIndex}
                           style={{
                              border: styles.border,
                              padding: styles.padding,
                              textAlign: styles.textAlign }} >
                           [{rowIndex + 1},{colIndex + 1}]
                        </td>))}
                  </tr>))}
            </tbody>

         </table>

         {helperText && (<p className="text-muted-foreground text-[0.8rem]" >
            {helperText}
         </p>)}
      </div>
   );
}


type RowData = Record<string, string>;

function FormComponent({ elementInstance,
   submitValue,
   isInvalid,
   defaultValue }: {
      elementInstance: FormElementInstance;
      submitValue?: (key: string, value: string) => void;
      isInvalid?: boolean;
      defaultValue?: string;
   }) {

   const element = elementInstance as CustomInstance;
   const styles = element.styleConfig;
   const { label, helperText, headers = [], rows, required } = element.extraAttributes;

   // Initialize table data
   const initialTableData = defaultValue
      ? JSON.parse(defaultValue)
      : Array.from({ length: rows }, () =>
         headers.reduce((acc, header) => {
            acc[header] = "";
            return acc;
         }, {} as RowData)
      );

   const [tableData, setTableData] = useState<RowData[]>(initialTableData);
   const [error, setError] = useState(false);

   useEffect(() => {
      setError(isInvalid === true);
   }, [isInvalid]);

   useEffect(() => {
      if (submitValue) {
         submitValue(element.id, JSON.stringify(tableData));
      }
   }, [tableData, submitValue, element.id]);

   const addRow = () => {
      const newRow = headers.reduce((acc, header) => {
         acc[header] = "";
         return acc;
      }, {} as RowData);
      setTableData((prev) => [...prev, newRow]);
   };

   const removeRow = (rowIndex: number) => {
      setTableData((prev) => prev.filter((_, i) => i !== rowIndex));
   };

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
         <table style={{border: styles.border,
                        backgroundColor: styles.backgroundColor,
                        width: "100%"
                     }} >
            <thead>
               <tr>
                  {headers.map((header, index) => (
                     <th key={index}
                         style={{   fontFamily: styles.fontFamily,
                                    fontSize: `${styles.fontSize}px`,
                                    padding: styles.padding,
                                    textAlign: styles.textAlign }} >
                        {header}
                     </th> ))}
                  <th style={{ padding: styles.padding }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                     {headers.map((header, colIndex) => (
                        <td key={colIndex} style={{ padding: styles.padding }}>
                           <Input   value={row[header]}
                                    onChange={(e) => {
                                       const newValue = e.target.value;
                                       setTableData((prev) => {
                                          const newData = [...prev];
                                          newData[rowIndex][header] = newValue;
                                          return newData });       }}
                                    style={{
                                       fontFamily: styles.fontFamily,
                                       fontSize: `${styles.fontSize}px`,
                                       border: styles.border }} />
                        </td>))}
                        <td>
                           <Button variant="ghost"
                                 onClick={() => removeRow(rowIndex)} >
                              Remove
                           </Button>
                        </td>
                  </tr>))}
            </tbody>
         </table>
         <Button onClick={addRow} className="mt-2">
            Add Row
         </Button>
         {helperText && (
            <p
               className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-400")}>
               {helperText}
            </p>)}
         {error && (
            <p className="text-red-400 text-[0.8rem]">
               This table is required and must have at least one row.
            </p>)}
      </div>
   );
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   const { updateElement, setSelectedElement } = useDesigner();
   const element = elementInstance as CustomInstance;

   const form = useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onSubmit",
      defaultValues: {
         label: element.extraAttributes.label,
         helperText: element.extraAttributes.helperText,
         required: element.extraAttributes.required,
         rows: element.extraAttributes.rows,
         headers: element.extraAttributes.headers || [],
      },
   });

   useEffect(() => {
      form.reset({
         ...element.extraAttributes,
         headers: element.extraAttributes.headers || []
      });
   }, [form, element]);

   function applyChanges(values: propertiesFormSchemaType) {
      updateElement(element.id, {
         ...element,
         extraAttributes: {
            label: values.label,
            helperText: values.helperText,
            required: values.required,
            rows: values.rows,
            headers: values.headers,
         },
      });
      toast.success("Table properties saved successfully!");
      setSelectedElement(null);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">

            <Button className="w-full hover:cursor-pointer" type="submit">
               Save
            </Button>

            <Separator />

            <FormField
               control={form.control}
               name="label"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Label</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }}
                        />
                     </FormControl>
                     <FormDescription>
                        Метка поля. <br /> Она будет отображаться над полем.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="helperText"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Helper Text</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                           }}
                        />
                     </FormControl>
                     <FormDescription>                        
                        Вспомогательный текст таблицы. <br />
                        Он будет отображен под таблицы.</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="rows"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Initial Rows</FormLabel>
                     <FormControl>
                        <Input
                           type="number"
                           {...field}
                           onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                           min={1}
                           max={10}
                        />
                     </FormControl>
                     <FormDescription>Количество строк, показанных изначально (1-10).</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="headers"
               render={({ field }) => (
                  <FormItem>
                     <div className="flex justify-between items-center">
                        <FormLabel>Column Headers</FormLabel>
                        <Button
                           variant="outline"
                           onClick={(e) => {
                              e.preventDefault();
                              form.setValue("headers", [...(field.value || []), "New Column"]);
                           }}>
                           <AiOutlinePlus className="mr-2" /> Add
                        </Button>
                     </div>
                     <div className="flex flex-col gap-2">
                        {(field.value || []).map((header, index) => (
                           <div key={index} className="flex items-center gap-1">
                              <Input
                                 value={header}
                                 onChange={(e) => {
                                    const newHeaders = [...(field.value || [])];
                                    newHeaders[index] = e.target.value;
                                    field.onChange(newHeaders);
                                 }}
                              />
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    const newHeaders = (field.value || []).filter((_, i) => i !== index);
                                    field.onChange(newHeaders);
                                 }}
                              >
                                 <AiOutlineClose />
                              </Button>
                           </div>
                        ))}
                     </div>
                     <FormDescription>Имена столбцов таблицы.</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Separator />
            <FormField
               control={form.control}
               name="required"
               render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                     <div>
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                           Укажите, обязательно ли заполнять этот элемент формы. <br />
                           Статус будет применён при отправке формы.
                        </FormDescription>
                     </div>
                     <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                  </FormItem>
               )}
            />
         </form>
      </Form>
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
                  </div>

                  <div className="flex flex-col py-1 space-y-0.5 ">
                     <FontWeightControl control={formStyles.control} />
                  </div>


                  <div className="flex flex-col py-1 space-y-0.5 ">
                  </div>
               </div>


               <div className='border-l-[1px] border-foreground h-[30px]' />

               <TextAlignControl control={formStyles.control} />

               <div className='border-l-[1px] border-foreground h-[30px]' />




               <div className="flex flex-row space-x-1.5">

                  <div className="flex flex-col py-1 space-y-0.5 justify-center">
                     <PaddingControl control={formStyles.control} />
                  </div>

               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginTopControl control={formStyles.control} />
                  <MarginBottomControl control={formStyles.control} />
               </div>
               <div className="flex flex-col py-1 space-y-0.5">
                  <MarginLeftControl control={formStyles.control} />
                  <MarginRightControl control={formStyles.control} />
               </div>
                  <div className="flex flex-col py-1 space-y-0.5">


                  </div>
               </div>

               <div className='border-l-[1px] border-foreground h-[30px]' />

               <div className="flex flex-col justify-center py-1 space-y-0.5 ">
                  <BorderControl control={formStyles.control} />
                  <BackgroundColorControl control={formStyles.control} />
               </div>

         </form>
      </Form>

   </div>);
}

