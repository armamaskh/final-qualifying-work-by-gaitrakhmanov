"use client"

import { section } from '@/types/models';
import React, { useEffect, useState } from 'react';
import useConstructor from '../../hooks/useConstructor';
import { GetSectionsByCollectionId } from '@/api/collection';
import { ImSpinner2 } from 'react-icons/im';
import { DndContext, DragEndEvent, MouseSensor, useDndMonitor, useSensor, useSensors } from '@dnd-kit/core';
import Constructor from '../CollectionConstructor/Constructor';

import { arrayMove } from '@dnd-kit/sortable';
import { DivisionInstance } from '../Context/ConstructorContext';
import DragOverlayWrapperForConstructor from './DragOverlayWrapperForConstructor';
import { moveContentItemToOtherDivision, reorderContentCollection } from '@/api/collectionContent';
import CreateDivisionButton from '../CreateDivisionButton';
import CreateSectionButton from '../CreateSectionButton';
import CustomToolBar from '../CustomToolBar';
import { IoTrash } from 'react-icons/io5';
import { DeleteSection } from '@/api/section';
import { GetPdfCollectionById, GetPdfSectionById } from '@/api/pdfGenerator';
import { TbPdf } from 'react-icons/tb';
import { toast } from 'sonner';
import { GetDivisionsByCollectionId, reorderDivisions } from '@/api/division';


function CollectionConstructor( {collection_id, 
                                 collection_name}: {collection_id: number,
                                                    collection_name: string } ) {

   const [isReady, setIsReady] = useState(false);
   const {divisions, setDivisions} = useConstructor();


   const [sections, setSections] = useState<section[] | []>([]);

   const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10} });
   const sensors = useSensors(mouseSensor);

   useEffect(() => {
      if (isReady) return;
      fetchSectionsDivisions();

      async function fetchSectionsDivisions() {
         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         const divisions = await GetDivisionsByCollectionId(collection_id);
         const sections = await GetSectionsByCollectionId(collection_id);
         setDivisions(divisions || []);
         setSections(sections || []);
         setIsReady(true); }
      const readyTimeout = setTimeout(() => setIsReady(true), 100);

      return () => clearTimeout(readyTimeout);
   }, [collection_id, isReady, setDivisions, setSections,setIsReady ]);


   if (!isReady) {
      return (
         <div className="flex flex-col items-center justify-center w-full h-full">
            <ImSpinner2 className='animate-spin h-12 w-12' />
         </div>);}

   return ( 
            <div className='flex flex-col items-center justify-center w-full h-full'>

               <CustomToolBar>
                  <span className='min-w-[500px] text-xl text-foreground/70 font-medium'>
                     Название: {collection_name}
                  </span>
                  <div className='flex flex-row gap-x-2.5'> 
                     <CreateSectionButton collection_id={collection_id}
                                       onSectionCreated={async () => {
                                          const updatedSections = await GetSectionsByCollectionId(collection_id);
                                          setSections(updatedSections || []); }} />
                     <button className='px-2 w-full bg-foreground/50 rounded-[8px] focus-visible:ring-0 h-5.5 cursor-pointer hover:opacity-60 flex flex-row gap-2 items-center'
                           onClick={async() => { await GetPdfCollectionById(collection_id) } }>
                        <TbPdf className='size-5 mt-0.5'/>
                        <p className='flex flex-row justify-between space-x-5 font-medium w-full'>Генерация</p>
                     </button>
                  </div>
                  </CustomToolBar>
               <DndContext sensors={sensors}>
                  
                  <DndContent sections={sections} divisions={divisions} setSections={setSections} />
                  <DragOverlayWrapperForConstructor />
               </DndContext>
            </div>);
}

export default CollectionConstructor

function DndContent({ sections, 
                      setSections,
                      divisions }: { sections: section[],
                                     setSections: React.Dispatch<React.SetStateAction<section[]>> ,
                                     divisions: DivisionInstance[] }) {
  const { setDivisions } = useConstructor();

  useDndMonitor({
      onDragEnd: (event: DragEndEvent) => {
         const { active, over } = event;

         if (!active || !over) return;

         const a = active.data.current;
         const o = over.data.current;

         if (a?.type === "division" && o?.type === "division") {
         const from = divisions.findIndex((d) => d.id === a.id);
         const to = divisions.findIndex((d) => d.id === o.id);
         if (from === -1 || to === -1) return;

         const newDivs = arrayMove(divisions, from, to);

         const updated = newDivs.map((d, i) => ({ ...d, order: i }));
         setDivisions(updated);
         reorderDivisions(updated.map(d => ({ id: d.id, order: d.order }))); }

         if (a?.type === "content" && o?.type === "division") {
            const { divisionId: fromDiv, contentId } = a;
            const toDiv = o.id as number;
            const src = divisions.find((d) => d.id === fromDiv);
            const dst = divisions.find((d) => d.id === toDiv);
            if (!src || !dst) return;
            const item = src.content_items.find((c) => c.id === contentId);
            if (!item) return;

            setDivisions((prev) => {
               return prev.map((div) => {
                  if (div.id === fromDiv) {
                     return { ...div, content_items: div.content_items.filter((c) => c.id !== contentId) }; }
                  if (div.id === toDiv) {
                     const updated = [...div.content_items, { ...item, division_id: toDiv, order: div.content_items.length }];
                     return { ...div, content_items: updated };  }
                  return div; });
            });
         moveContentItemToOtherDivision(contentId, toDiv, dst.content_items.length ); }
      
         if(a?.type === "content" && o?.type === "content"){
            const fromDiv = a.divisionId;
               const toDiv = o.divisionId;
               const contentId = a.contentId;
               const targetContentId = o.contentId;
            if(fromDiv === toDiv){
               const division = divisions.find(d => d.id == fromDiv);
               if(!division) return;

               const fromIndex = division.content_items.findIndex(item => item.id === contentId);
               const toIndex = division.content_items.findIndex(item => item.id === targetContentId);

               if(fromIndex === -1 || toIndex === -1) return;

               const reordered = arrayMove(division.content_items, fromIndex, toIndex);

               const updatedContentItems = reordered.map((c, i) => ({ ...c, order: i }));
               setDivisions(prev =>
                  prev.map(d => d.id === fromDiv ? { ...d, content_items: updatedContentItems } : d)
               );

               reorderContentCollection(updatedContentItems.map(c => ({ id: c.id, order: c.order })));
            }
         }
   }
  });

  return (
    <main className='flex flex-col items-center w-full h-full grow mt-4'>
      <div className='flex flex-grow flex-col w-[75%] h-full rounded-2xl p-5'>
        <div className='flex flex-col w-full gap-y-10'>
          {sections.map(section => (
            <div key={section.id}className='flex flex-row '>
               <SectionWrapper key={section.id}
                               section={section} setSections={setSections}
                               setDivisions={setDivisions} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


export function SectionWrapper({ section, 
                                 setSections,
                                 setDivisions }: { section: section, 
                                                   setSections: React.Dispatch<React.SetStateAction<section[]>> ,
                                                   setDivisions: React.Dispatch<React.SetStateAction<DivisionInstance[]>> }) {

   const handleDeleteSection = async() => {
      try {
         await DeleteSection(section.id);
         setSections(prev => prev.filter(s => s.id !== section.id));
         toast.success('Cекция успешно удалена'); } 
      catch (error) {
         toast.error('Ошибка при удалении секции');
         console.error( error);} 
   };
   
   return (
      <div className="flex flex-col w-full grow relative ">
         <div className='flex justify-between items-center  w-full cursor-default select-none '>
            <div className='flex items-center gap-3'>
               <div className="text-foreground/ text-4xl font-medium"> {section.name} </div>
               <div className='text-2xl font-normal text-foreground/25'> \ {section.section_type} </div>
            </div>
            <div className='flex items-center gap-x-3.5'>
               <CreateDivisionButton section_id={section.id} 
                                     setDivisions={setDivisions} />

               <div className='border-l-2 border-foreground/15 h-7' />

               <div className='flex flex-row gap-x-1'>
                  <button className='ml-2 cursor-pointer hover:opacity-60'
                          onClick={() => {handleDeleteSection()} }>
                     <IoTrash className='size-5'/>
                  </button>

                  <button className=' cursor-pointer hover:opacity-60'
                          onClick={async () => {
                              try {
                                 await GetPdfSectionById(section.id);
                                 toast.success('PDF успешно запрошен');} 
                              catch (error) {
                                 toast.error('Ошибка при запросе PDF');
                                 console.error(error);} }}>
                     <TbPdf className='size-10'/>
               </button>
               </div>
            </div>
         </div>
         <div className="min-w-0  w-full h-[1px] outline bg-foreground mb-10 " />

            <Constructor section_id={section.id} />
      </div>
   );

}