import React, { ReactNode, useState } from 'react'
import { Button } from '../../ui/button';
import Link from 'next/link';
import DropDownMenu from './DropDownMenu';
import { useDrag } from '../../../hooks/useDrag';

function UserToolBar( {children}: {children?: ReactNode} ) {
  const { dragHandlers, dragStyles } = useDrag();
  const [activeButton, setActiveButton] = useState('Мои публикации');


  const buttons = [
    { id: 'Мои публикации', text: 'Мои публикации', href: "Main" },
    { id: 'Отправленные заявки', text: 'Отправленные заявки', href: "Conferences" },
  ];

  return (
    <nav className='flex justify-center pt-1.5' {...dragHandlers}>
      <div className='flex items-center justify-between px-3 min-w-[607px] w-auto h-8 bg-neutral-400/50 rounded-xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] backdrop-blur-[50px]' style={dragStyles}>

        <div className='flex-grow flex flex-row gap-x-[25px] items-center justify-start'>
          {children}

          {buttons.map((button, index) => (
            <React.Fragment key={button.id}>
              <Button
                variant="link"
                asChild
                className={`relative w-auto h-3 text-md hover:no-underline hover:font-medium ${activeButton === button.id ? 'font-bold' : 'font-normal'}`}
                onClick={() => setActiveButton(button.id)} >

                <Link href="">
                  {activeButton === button.id && (
                    <div className="absolute inset-1 bg-foreground/20 rounded-sm blur-[5px] -z-10" />
                  )}
                  {button.text}
                </Link>

              </Button>

              {index !== buttons.length - 1 && (
                <div className='border-l-[0.5px] border-foreground h-[12px]' /> )}

            </React.Fragment>
          ))}


        </div>

        <DropDownMenu 
          items={ [
            {
              text: "Привет1",
              value: "пока1"
            },
            {
              text: "привет2",
              value: "пока2"
            },
            {
              text: "привет3",
              value: "пока2"
            },
            {
              text: "привет4",
              value: "пока2"
            },
            {
              text: "привет5",
              value: "пока2"
            }
              
            ]} />


      </div>
    </nav>
  )
}

export default UserToolBar