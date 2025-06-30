

import { Suspense } from "react";


import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { CardStatsWrapper, StatsCards } from "@/components/CustomElementsUI/StatsFormsCards/StatsCards";
import { FormCards, FormCardSkeleton } from "@/components/CustomElementsUI/StatsFormsCards/FormCards";



export default function Home() {
  return (
    <div className="w-[85%] container">
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>

      <Separator className="my-5"/>
        <h2 className="text-2xl font-bold col-span-2">Your chapters</h2>
      <Separator className="my-5"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CreateFormButton/>
        
        <Suspense fallback={[1, 2, 3, 4].map( (el) =>  (<FormCardSkeleton key={el}/> )  ) }>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  );
}



