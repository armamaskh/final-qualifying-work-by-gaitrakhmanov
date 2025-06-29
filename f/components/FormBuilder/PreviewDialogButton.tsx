import useDesigner from '@/hooks/useDesigner';
import React from 'react';
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { FormElements } from '../FormElements/FormElements';


function PreviewDialogButton() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className='gap-2 hover:cursor-pointer focus-visible:ring-0'>
          <MdPreview className='h-6 w-6'/>
            Preview
        </Button>

      </DialogTrigger>
      <DialogContent className='w-screen h-screen flex flex-col flex-grow max-h-screen sm:max-w-none  p-0 gap-0'>
        <div className="px-4 py-2 border-b">
          <div className='text-lg font-bold text-muted-foreground'>
            <DialogTitle>
              Предварительный просмотр формы
            </DialogTitle>
          </div>
          <p className='text-sm text-muted-foreground'>
            Вот как ваша форма будет выглядеть для ваших пользователей
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper.svg)] overflow-y-auto">
          <div className="max-w-[827px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto">
            <div className="flex flex-col gap-4 flex-grow min-h-0">
                {elements.map((element) => {
                  const FormComponent = FormElements[element.type].formComponent;
                  return <FormComponent key={element.id} elementInstance={element} />
                })}
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

}

export default PreviewDialogButton