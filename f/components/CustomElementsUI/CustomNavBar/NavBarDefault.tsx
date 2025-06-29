"use client"


import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import LogoButton from '../../Assets/IconButtons/LogoButton'
import { useDrag } from '../../../hooks/useDrag'
import { Button } from '../../ui/button'

function NavBarDefault( ){
  const { dragHandlers, dragStyles } = useDrag();
  const [activeButton, setActiveButton] = useState('Главная');

    const buttons = [
    { id: 'Главная', text: 'Главная', href: "Main" },
    { id: 'Конференции', text: 'Конференции', href: "Conferences" },
    { id: 'Сборники', text: 'Сборники', href: "Collections" },
    { id: 'Разделы', text: 'Разделы', href: "Sections" },
    { id: 'Публикации', text: 'Публикации', href: "Publications" }
  ];

  return (
    <nav className='z-[1] flex items-center p-[11px] select-none'
         {...dragHandlers}>
      <div className='w-full h-20 bg-neutral-400/50 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] backdrop-blur-[50px] flex items-center'
           style={dragStyles} >
        <div className='relative z-100 w-full flex items-center justify-between pl-[140px] pr-[140px]'>
          
          <div className="flex-shrink-0 w-[225px]">
            <Link href={"/home"} className='flex w-[60px]'>
              <LogoButton />
            </Link>
          </div>

          <div className='flex-grow flex flex-col gap-y-[11px] mx-15 min-w-0'>

            <SearchBar>привет</SearchBar>

            <div className='flex-grow flex flex-row justify-center items-center gap-x-[30px]'>

              {buttons.map((button, index) => (
                <React.Fragment key={button.id}>
                  <Button 
                    variant="link" 
                    asChild 
                    className={`relative w-20 h-3 text-md gap-4 hover:no-underline hover:font-medium ${activeButton === button.id ? 'font-bold' : 'font-normal'}`}
                    onClick={() => setActiveButton(button.id)} >

                    <Link href="">
                      {activeButton === button.id && (
                        <div className="absolute inset-1 bg-foreground/20 rounded-sm blur-[5px] -z-10" />
                      )}
                      {button.text}
                    </Link>

                  </Button>

                  {index !== buttons.length - 1 && (
                    <div className='border-l-[1px] border-foreground h-[19px]' />
                  )}

                </React.Fragment>
              ))}
              

            </div>
          </div>

          <div className='flex-shrink-0 leading-3 flex flex-col items-end w-[225px]'>


            <Button variant="link" className='text-xl font-normal hover:no-underline hover:font-bold  text-right mb-[-10px]'>
              <Link href="" className='block w-full'>
                ВОЙТИ
              </Link>
            </Button>
            {/* <SignInDialogButton /> */}

            <Button variant="link" className='text-xl font-normal hover:no-underline hover:font-bold  text-right'>
              <Link href="" className='block w-full'>
                Зарегистрироваться
              </Link>
            </Button>


          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBarDefault


