import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import useConstructor from '../../hooks/useConstructor';
import { IoClose } from 'react-icons/io5';
import { TbPdf } from 'react-icons/tb';

function DragOverlayWrapperForConstructor() {
   const { divisions } = useConstructor();
   const [draggedItem, setDraggedItem] = useState<Active | null>(null);

   useDndMonitor({
      onDragStart: (event) => setDraggedItem(event.active),
      onDragCancel: () => setDraggedItem(null),
      onDragEnd: () => setDraggedItem(null),
   });

   if (!draggedItem) return null;

   const data = draggedItem.data?.current;
   let node = <div className="px-4 py-2 bg-white rounded shadow">Неизвестный элемент перетаскивания</div>;

   if (data?.type === "division") {
      const division = divisions.find((d) => d.id === data.id);
      if (division) {
         node = (
            <div className='w-full bg-foreground/15 flex flex-col justify-center items-start font-medium min-h-15 border-[1px] border-accent rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] opacity-70 pb-1.5'>
               
               <div className=" w-full flex justify-between items-center">

                  <div className="w-full flex flex-row items-center justify-between font-medium text-2xl p-5 ">
                     {division.name}[{division.order}]

                     <div className="mt-1 flex flex-row items-center -mr-5.5 gap-x-0.5">
                        <div  className={`w-[200px] h-8  rounded-2xl p-2.5 flex justify-center items-center bg-foreground/10 `}>
                           <div className="text-xs"> == </div>
                        </div>

                     <div className="mt-0.5 ">
                        <TbPdf className="size-8 text-foreground/85" />
                     </div>
                     </div>
                     
                  </div>

                  <div className="flex  items-center">
                     <div  className="w-full h-full -mt-10 mr-2 " >
                        <IoClose  className="size-5 opacity-50"/>
                     </div>
                  </div>
               </div>
               

                  <div className="space-y-2.5 min-w-full px-1">
                     {(division.content_items || []).map((item) => (
                        <div key={item.id} className={`  flex justify-between items-center p-2 pl-5  h-10  rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border-[0.10px] custom opacity bg-foreground/10 `} >
                                 <div className="flex flex-row justify-between space-x-5 font-medium w-full">

                                   <p >{item.id}[{item.order}]</p>

                                    <div className={`custom opacity bg-foreground/20 rounded-[8px]  h-6 hover:opacity-90 flex flex-row gap-2 items-center justify-center min-w-[170px] w-auto mt-0.5 mr-3 px-2.5`}>  
                                       <p className="w-full text-foreground/60 ">
                                          {new Date(item.created_at).toLocaleDateString("ru-Ru", { hour: "2-digit",
                                                                                                   minute: "2-digit",
                                                                                                   day: "2-digit",
                                                                                                   month: "long",
                                                                                                   year: "numeric" })  }
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex flex-row gap-x-1">
                                    <div className="mt-0.5 cursor-pointer hover:opacity-50 ">
                                       <TbPdf className="size-5 text-foreground/85" />
                                    </div>
                                    <div className="cursor-pointer text-red-300 flex justify-center hover:opacity-20" > 
                                          <IoClose  className="size-5"/>
                                    </div>
                                 </div>
                        </div>))
                     }
                  </div>
               
            </div>
         );
      }
   }

   if (data?.type === "content") {
      const division = divisions.find((d) => d.id === data.divisionId);
      const content = division?.content_items.find((c) => c.id === data.contentId);
      if (content) {
         node = ( 
            <div className={`  flex justify-between items-center p-2 pl-5  h-10  rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border-[0.10px] custom opacity bg-foreground/10 `} >
               <div className="flex flex-row justify-between space-x-5 font-medium w-full">

                  <p >{content.id}[{content.order}]</p>

                  <div className={`custom opacity bg-foreground/20 rounded-[8px]  h-6 hover:opacity-90 flex flex-row gap-2 items-center justify-center min-w-[170px] w-auto mt-0.5 mr-3 px-2.5`}>  
                     <p className="w-full text-foreground/60 ">
                        {new Date(content.created_at).toLocaleDateString("ru-Ru", { hour: "2-digit",
                                                                                 minute: "2-digit",
                                                                                 day: "2-digit",
                                                                                 month: "long",
                                                                                 year: "numeric" })  }
                     </p>
                  </div>
               </div>
               <div className="flex flex-row gap-x-1">
                  <div className="mt-0.5 cursor-pointer hover:opacity-50 ">
                     <TbPdf className="size-5 text-foreground/85" />
                  </div>
                  <div className="cursor-pointer text-red-300 flex justify-center hover:opacity-20" > 
                        <IoClose  className="size-5"/>
                  </div>
               </div>
            </div> );
      }
   }

   return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapperForConstructor;
