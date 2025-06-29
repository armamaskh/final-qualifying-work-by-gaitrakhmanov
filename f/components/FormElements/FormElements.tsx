import { CheckBoxFieldFormElement } from "../FormFields/CheckBoxField";
import { DateFieldFormElement } from "../FormFields/DateField";
import { ImageUploadFieldFormElement } from "../FormFields/ImageUploadField";
import { NumberFieldFormElement } from "../FormFields/NumberField";
import { ParagraphFieldFormElement } from "../FormFields/ParagraphField";
import { SelectFieldFormElement } from "../FormFields/SelectField";
import { SeparatorFieldFormElement } from "../FormFields/SeparatorField";
import { SpacerFieldFormElement } from "../FormFields/SpacerField";
import { SubTitleFieldFormElement } from "../FormFields/SubTitleField";
import { TableFieldFormElement } from "../FormFields/TableField";
import { TextAreaFieldFormElement } from "../FormFields/TextAreaField";
import { TextFieldFormElement } from "../FormFields/TextField";
import { TitleFieldFormElement } from "../FormFields/TitleField";

export type SubmitFunction = (key: string, value: string  ) => void; 

export type FormElementInstance = {
   id: string,
   type: ElementsType,
   extraAttributes?: Record<string, any>,
   styleConfig?: Record<string, any> }

export type FormElement = {
   type: ElementsType,

   construct: (id: string) => FormElementInstance,

   designerBtnElement: {
      icon: React.ElementType,
      label: string },

   designerComponent: React.FC<{
      elementInstance: FormElementInstance}>,
   formComponent: React.FC<{
      elementInstance: FormElementInstance;
      submitValue?: SubmitFunction;
      isInvalid?: boolean;
      defaultValue?: string }>,
   propertiesComponent: React.FC<{
      elementInstance: FormElementInstance}> 
   stylesComponent: React.FC<{
      elementInstance: FormElementInstance}> 

   validate: (formElement: FormElementInstance, currentValue: string) => boolean;   }


export type ElementsType = "TextField" | "NumberField" | "DateField" |
                           "TitleField" | "SubTitleField" | 
                           "SelectField" | "TableField"| 
                           "ParagraphField" | "TextAreaField" |
                           "SeparatorField" | "SpacerField" | "CheckBoxField" |
                           "ImageUploadField";

type FormElementsType = {
   [key in ElementsType as string]: FormElement }
                           
export const FormElements: FormElementsType = { 
   TextField: TextFieldFormElement,
   TitleField: TitleFieldFormElement,
   SubTitleField: SubTitleFieldFormElement,
   ParagraphField: ParagraphFieldFormElement,
   SeparatorField: SeparatorFieldFormElement,
   SpacerField: SpacerFieldFormElement,
   NumberField: NumberFieldFormElement,
   TextAreaField: TextAreaFieldFormElement,
   DateField: DateFieldFormElement,
   SelectField: SelectFieldFormElement,
   CheckBoxField: CheckBoxFieldFormElement,

   ImageUploadField: ImageUploadFieldFormElement,
   TableField: TableFieldFormElement, }