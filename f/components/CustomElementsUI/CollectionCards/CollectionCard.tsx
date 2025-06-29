"use client"

import { DeleteCollection } from '@/api/collection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { collection } from '@/types/models';
import { Edit2, Link, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
// import Image from "next/image"


export default function CollectionCard({ collection,
                                         setCollections,
                                         reverse = false }: {  collection: collection,
                                                               setCollections:React.Dispatch<React.SetStateAction<collection[]>>,
                                                               reverse?: boolean}) {

   const router = useRouter();

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/constructor/${collection.id}`)
  }

  const handleDeleteCollection = async(e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
        await DeleteCollection(collection.id);
        setCollections(prev => prev.filter(c => c.id !== collection.id)); } 
    catch (error) {
        console.error("Ошибка при удалении секции:", error);} 
  };

    const handleEditCollection = async(e: React.MouseEvent) => {
    try { e.preventDefault();
          router.push(`/constructor/${collection.id}`) } 
    catch (error) {
        console.error("Ошибка при переходе в конструктор коллекции:", error);} 
  };

  const content = (
    <div className="relative group w-full max-w-full cursor-pointer transition-transform duration-300"
      onClick={onClickHandler}>

      <div className={`absolute -inset-4 mx-auto z-0 blur-[95px] rounded-[100px] bg-foreground opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50 `}
        style={{
          transform: `${!reverse ? 'rotate(-30deg)' : 'rotate(30deg)'}`,
          width: '90%',
          height: '150%',
          top: '-25%',
          left: `${!reverse ? '-55%' : '25%'}`,
          right: `${!reverse ? '25%' : '-55%'}`,
        }} />

      <Card className={`-my-30 bg-transparent relative z-10 flex overflow-hidden px-2 w-full max-w-full border-0 shadow-none ${reverse ? 'flex-row-reverse ml-[50%]' : 'flex-row -ml-[50%]'} `}>

        <div className={`flex-1 flex flex-col px-0 py-5 min-h-[500px] w-[300px]`} >
          <CardHeader className="p-0 mb-4">

            <CardTitle className={`text-xl font-bold text-right ${!reverse ? 'items-end text-right' : 'items-start text-left '} `}>
              {collection.name}
            </CardTitle>

            <CardDescription className={`mt-2 ${!reverse ? 'items-end text-right' : 'items-start text-left '} `}>
              <div className="text-sm">
                {collection.authors || "Авторы не указаны"}
              </div>
              {collection.publisher && (
                <div className="text-sm mt-1">
                  Издатель: {collection.publisher}
                </div>)}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 flex-grow overflow-y-auto">
            <div className={`text-xl text-foreground font-medium  
                               ${!reverse ? 'items-end text-right' : 'items-start text-left '} 
                                break-words  
                                whitespace-pre-wrap
                                word-wrap 
                                overflow-wrap 
                                max-w-[300px]`}>
              {collection.description || "Описание отсутствует"}
            </div>
          </CardContent>

          <CardFooter className={`p-0 mt-4 flex flex-col gap-2  ${!reverse ? 'items-end text-right' : 'items-start text-left '}`}>

            <div className="text-xs text-muted-foreground">
              Разделов: {collection.sections?.length || 0}
            </div>

            <div className="flex gap-2">
              {collection.published ? (
                <Badge>Опубликовано</Badge>) : (
                <Badge variant="destructive">Черновик</Badge>)}
              {collection.adoption_state && (
                <Badge variant="outline">Принято</Badge>)}
            </div>

              <div>
                {!collection.published && (
                    <Button variant="default" 
                            className="w-full mt-1 opacity-50 hover:bg-foreground/70 cursor-pointer"
                            onClick={handleEditCollection}>
                        <Edit2/>
                        <p className='font-medium'> Редактировать </p>
                    </Button>)}

                <Button variant="destructive" 
                        className="w-full mt-1 opacity-50 hover:bg-foreground/70 cursor-pointer"
                        onClick={handleDeleteCollection}>
                    <Trash />
                    <p className='font-medium'> Удалить </p>
                </Button>
             </div>

          </CardFooter>
        </div>

        {/* Правая часть - изображение */}
        <div className="relative rounded-3xl w-[350px] min-w-[300px] h-[500px] overflow-hidden">
          {collection.cover ? (
            <img
              src={`data:image/png;base64,${collection.cover}`}
              alt={`Обложка коллекции ${collection.name}`}
              className="object-cover w-full h-full"
            />) : (<div className="w-full h-full bg-foreground/20 flex items-center justify-center">
              <span className="text-muted-foreground">Нет обложки</span>
            </div>)}
        </div>
      </Card>
    </div>);

  return collection.published ?
    (
      <Link href={`/collections/${collection.id}`} className="block">
        {content}
      </Link>
    ) : (content);
}
