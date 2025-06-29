"use client"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type CollectionContentInstance = {
  id: number;                   
  order: number;         
  submission_id: number; 
  division_id: number;      
  is_selected: boolean;   
  created_at: Date;   };

export type DivisionInstance = {
  id: number;                       
  name: string;                      
  order: number;      
  section_id: number;            
  form_id: number; 
  content_items: CollectionContentInstance[];  };


type ConstructorContextType = {
   divisions: DivisionInstance[];
   setDivisions: Dispatch<SetStateAction<DivisionInstance[]>>;

   addDivision: ( index: number,  division: DivisionInstance ) => void;
   removeDivision: (id: number) => void;

   addContentItem: (divisionId: number, CollectionContent: CollectionContentInstance ) => void;
   removeCollectionContent: (divisionId: number, itemId: number) => void;

   moveContentItem: (sourceDivisionId: number, targetDivisionId: number, itemColContentId: number) => void; 
};

export const ConstructorContext = createContext<ConstructorContextType | null>(null);

export default function ConstructorContextProvider( {children}:{children: ReactNode} ) {
   const [divisions, setDivisions] = useState<DivisionInstance[]>([]);

   const addDivision = ( index: number, division: DivisionInstance ) => {
      setDivisions((prev) => 
         {
            const newDivision: DivisionInstance = {
               ...division,
               order: index,
               content_items: []  };
            const newDivisions = [...prev];     

            newDivisions.splice(index, 0, newDivision);

            // return newDivisions 
            return newDivisions.map((d, i) => ({ ...d, order: i }));
         } );
   };

   const removeDivision = (id: number) => {
      setDivisions((prev) =>
         prev.filter( (div) => div.id !== id)
             .map((d, i) => ({ ...d, order: i })) );
   };

   const addContentItem = (divisionId: number, CollectionContent: CollectionContentInstance) => {
      setDivisions((prev) =>
         prev.map((div) =>
            div.id === divisionId ? 
               {
                  ...div,
                  content_items: 
                     [
                        ...div.content_items,
                     
                        { ...CollectionContent,
                           division_id: divisionId, 
                          order: div.content_items.length }
                     ],
               } : div )
      );
   };

   const removeCollectionContent = (divisionId: number, col_contentId: number) => {
         setDivisions((prev) =>
            prev.map((div) =>
               div.id === divisionId ? 
                  { ...div, 
                     content_items: div.content_items
                        .filter((col_content) => col_content.id !== col_contentId) 
                        .map((item, i) => ({ ...item, order: i })),
                  }
               : div )
            );
   };

   const moveContentItem = (sourceDivisionId: number, targetDivisionId: number, ColContentId: number) => {

      setDivisions((prev) => {
         const newDivisions = [...prev];
         const sourceDiv = newDivisions.find((d) => d.id === sourceDivisionId);
         const targetDiv = newDivisions.find((d) => d.id === targetDivisionId);
         if (!sourceDiv || !targetDiv) return prev;

         const content_collection = sourceDiv.content_items
                                       .find((i) => i.id === ColContentId);
         if (!content_collection) return prev;

         sourceDiv.content_items = sourceDiv.content_items
                                          .filter((i) => i.id !== ColContentId)
                                          .map( (c,i) => ({...c, order: i}) );
         targetDiv.content_items = [
            ...targetDiv.content_items,
            {...content_collection, division_id: targetDiv.id, order: targetDiv.content_items.length} ];

         return [...newDivisions];
      });
   };
      

   return( 
   <ConstructorContext.Provider value={
      { divisions, 
      setDivisions, 
      addDivision,
      removeDivision, 
      addContentItem, 
      removeCollectionContent, 
      moveContentItem } }>

            {children}

         </ConstructorContext.Provider> );
}


