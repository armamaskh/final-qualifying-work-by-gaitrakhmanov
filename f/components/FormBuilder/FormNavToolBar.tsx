import React from 'react'

import { form } from '@/types/models'
import PublishFormButton from './PublishFormButton'
import SaveFormButton from './SaveFormButton'
import PreviewDialogButton from './PreviewDialogButton'

function FormNavToolBar({form}: {form: form}) {
   return (
      <div className='relative w-full h-full flex items-center'>
         <h2 className=' absolute left-0 truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Name:</span>
            {form.name}
         </h2>
         <div className='absolute right-0 flex justify-end items-center gap-2'>
            <PreviewDialogButton />
            {!form.published && (
               <>
                  <SaveFormButton id={form.id} />
                  <PublishFormButton id={form.id} />
               </>)}
         </div>
      </div>
   )
}

export default FormNavToolBar