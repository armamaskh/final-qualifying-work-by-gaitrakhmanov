import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';

function SignInDialogButton() {
  return (
    <Dialog >
      <DialogTrigger >
            <Button variant="link" className='text-xl font-normal hover:no-underline hover:font-bold  text-right mb-[-10px]'>
                ВОЙТИ
            </Button>
      </DialogTrigger>

      <DialogOverlay className="bg-transparent" />
      
      <DialogContent className='w-100 h-70 bg-neutral-400/50 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] backdrop-blur-[50px] flex flex-col flex-grow max-h-screen sm:max-w-none mt-200 gap-0'>

        <DialogTitle>привет</DialogTitle>


      </DialogContent>
    </Dialog>
  );

}

export default SignInDialogButton