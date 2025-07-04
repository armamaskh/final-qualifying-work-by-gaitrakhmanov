"use client";

import { createContext, Dispatch, ReactNode, SetStateAction,  useState } from "react";
import { FormElementInstance } from "../FormElements/FormElements";

type DesignerContextType = {
   elements: FormElementInstance[],
   setElements: Dispatch<SetStateAction<FormElementInstance[]>>,
   addElement: (index: number, element: FormElementInstance) => void,
   updateElement: (id: string, element: FormElementInstance ) => void,
   removeElement: (id: string) => void; 

   selectedElement: FormElementInstance | null,
   setSelectedElement:  Dispatch<SetStateAction<FormElementInstance | null>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}:{children:ReactNode}){

   
   const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)

   const [elements, setElements] = useState<FormElementInstance[]>([])

   const addElement = (index: number, element: FormElementInstance) => {
      setElements((prev) => {
         const newElements = [...prev];
         newElements.splice(index, 0, element);
         return newElements
      })
   } 

   const removeElement = (id: string) => {
      setElements( (prev) => prev.filter(elements => elements.id !== id) ); }
   
   const updateElement = (id: string, element: FormElementInstance) => {

      setElements((prev) => {
         const newElements = [...prev];
         const index = newElements.findIndex((el) => el.id === id);


         newElements[index] = element;
         return newElements; })

   }


   return (
      <DesignerContext.Provider 
         value={{ elements, 
                  setElements, 
                  addElement, 
                  updateElement, 
                  removeElement, 
                  selectedElement,
                   setSelectedElement}}>

         {children}

      </DesignerContext.Provider>);
}