"use client"

import { GetCollections } from "@/api/collection";
import { collection } from "@/types/models";
import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import { Skeleton } from "../../ui/skeleton";


export function CollectionCards() {
  const [collections, setCollections] = useState<collection[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      const data = await GetCollections();
      setCollections( data ); 
      setLoading(false);}

    fetchCollections();
  }, []);

   if (loading) {
      return (
         <div className="flex flex-col max-w-md mx-auto">
            {[1].map((el) => (
            <CollectionCardSkeleton key={el} />))}
         </div>); }

  return ( <>
            {collections.map( (item, index) => 
                  <div key={item.id + index} className="-my-5 flex justify-center ">
                    <CollectionCard collection={item} setCollections={setCollections} reverse={index % 2 === 1} />
                  </div> )
            }
           </> );
}


function CollectionCardSkeleton() {
   return (<Skeleton className="border-7 h-[2000px] w-full mb-4" />)
}