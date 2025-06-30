"use client";

import {form} from "@/types/models"
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {BiRightArrowAlt} from 'react-icons/bi'
import {FaEdit} from 'react-icons/fa'
import {   GetForms } from "@/api/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa"
import { useEffect, useState } from "react";



export function FormCardSkeleton() {
  return (<Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>)}

export async function FormCards() {

   const [forms, setForms] = useState<form[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
   GetForms().then((data) => { setForms(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
         }, [setForms, setLoading]);

  return (<>
            {!loading && forms && forms.map((form) => (
              <FormCard key={form.id} form={form} />) ) }
          </> );
}

function FormCard({form}: {form: form}) { 

   return( <Card >
               <CardHeader>
               <CardTitle className="flex items-center gap-2 justify-between">
                  <span className="truncate font-bold w-30 overflow-hidden whitespace-nowrap">{form.name}</span>
                  {form.published && <Badge>Published</Badge>}
                  {!form.published && <Badge variant="destructive">Draft</Badge>}
               </CardTitle>
               <CardDescription>
                  {formatDistance(form.created_at, new Date(), {addSuffix: true})}
                  {
                     form.published && 
                     (<span className="flex items-center gap-2">
                                       <LuView className="text-muted-foreground"/>
                                       <span>{form.visits.toLocaleString()}</span>
                                       <FaWpforms className="text-muted-foreground"/>
                                       <span>{form.submissions.toLocaleString()}</span>
                                       </span>) }
               </CardDescription>
               </CardHeader>
               <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
               {form.description || "No description"}
               </CardContent>
               <CardFooter>
               {form.published && (
                  <Button asChild className="w-full mt-2 text-md gap-4">
                     <Link href={`/forms/${form.id}`} >
                     Просмотр статистики
                     <BiRightArrowAlt/>
                     </Link>
                  </Button> )}
               {!form.published && (
                  <Button asChild variant="secondary" className="w-full mt-2 text-md gap-4">
                     <Link href={`/builder/${form.id}`} >
                     Изменить форму
                     <FaEdit/>
                     </Link>
                  </Button> )}
               </CardFooter>
            </Card> );
   }


