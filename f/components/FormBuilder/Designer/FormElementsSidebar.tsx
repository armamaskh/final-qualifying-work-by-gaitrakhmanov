import { FormElements } from '@/components/FormElements/FormElements'
import SidebarBtnElements from '@/components/SidebarBtnElements'
import { Separator } from '@/components/ui/separator'
import React from 'react'



function FormElementsSidebar() {
  return (
    <div className='pl-4'>
      <p className='text-sm text-foreground/70'>Элементы формы</p>
      <Separator className='my-2'/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Элементы макета
        </p>
        <SidebarBtnElements formElement={FormElements.TitleField} />
        <SidebarBtnElements formElement={FormElements.SubTitleField} />
        <SidebarBtnElements formElement={FormElements.ParagraphField} />
        <SidebarBtnElements formElement={FormElements.SeparatorField} />
        <SidebarBtnElements formElement={FormElements.SpacerField} />




        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Элементы формы
        </p>
        <SidebarBtnElements formElement={FormElements.TextField} />
        <SidebarBtnElements formElement={FormElements.NumberField} />
        <SidebarBtnElements formElement={FormElements.TextAreaField} />
        <SidebarBtnElements formElement={FormElements.DateField} />
        <SidebarBtnElements formElement={FormElements.SelectField} />
        <SidebarBtnElements formElement={FormElements.CheckBoxField} />
        <SidebarBtnElements formElement={FormElements.ImageUploadField} />
        <SidebarBtnElements formElement={FormElements.TableField} />





      </div>
      

    </div>
  )
}

export default FormElementsSidebar