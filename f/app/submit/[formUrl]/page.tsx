import { GetDivisionByFormId } from '@/api/division';
import { GetFormContentByUrl } from '@/api/form'
import DesignerContextProvider from '@/components/Context/DesignerContext';
import { FormElementInstance } from '@/components/FormElements/FormElements';
import FormSubmitComponents from '@/components/FormSubmitComponents';
import React from 'react'

interface SubmitPageProps {
  params: Promise<{ formUrl: string }>;
}

async function SubmitPage( {params}: SubmitPageProps ) {
  const {formUrl} = await params;
  const form = await GetFormContentByUrl(formUrl);
  const division = await GetDivisionByFormId(form.id);
  
  const targetNames = ["main", 
                        "Основная","основная",
                        "Часть","часть", 
                        "Публикации","публикации", 
                        "Статьи", "статьи"];
  const isMainSection  = targetNames.some(name => division.name.includes(name));


  
  if(!form) {
    throw new Error("Form not found!");}

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return (
    <DesignerContextProvider>

      <FormSubmitComponents formUrl={formUrl} content={formContent} isMainSection={isMainSection} />
    </DesignerContextProvider>
  )
}

export default SubmitPage

