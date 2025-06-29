


"use client"

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CollectionContentInstance, DivisionInstance } from "../Context/ConstructorContext";
import useConstructor from "../../hooks/useConstructor";
import { Button } from "../ui/button";
import { DeleteDivision } from "@/api/division";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { GetFormById, GetFormSubmissionById, IsApprovedFormSubmission } from "@/api/form";
import { useEffect, useState } from "react";
import { form } from "@/types/models";
import CreateContentCollection from "../CreateContentCollection";
import { DeleteContentCollection, DeleteContentCollectionArticle, GetIsSelectedById, IsSelectContentCollection } from "@/api/collectionContent";
import { TbPdf } from "react-icons/tb";
import { GetPdfCollectionContentById, GetPdfDivisionById } from "@/api/pdfGenerator";

export function ConstructorElement({ division, }: { division: DivisionInstance; }) {
  const { removeDivision } = useConstructor();
  const [formG, setFormG] = useState<form | null>(null);

useEffect(() => {
  
  async function fetchForm() {
    try {
      const form = await GetFormById(division.form_id);
      setFormG(form);} 
    catch (error) { setFormG(null); }
  }
  fetchForm();
}, [division, division.form_id]);


  const { attributes, listeners, setNodeRef: dragRef } = useDraggable({
    id: division.id,
    data: { type: "division", 
            id: division.id } });
  const { setNodeRef: dropRef, isOver } = useDroppable({
    id: division.id,
    data: { type: "division", 
            id: division.id } });

  const handlerDeleteDivision = async() => { 
    try {
      await DeleteDivision(division.id);
      removeDivision(division.id);
      
      toast.success(`Раздел ${division.name} удален!`); }
    catch(error) {
      toast.error("Ошибка при удалении раздела ");
      console.error(error);  }
   };

  // const handlerContentCollectionCreate = (newContent: CollectionContentInstance) => {
  //   setDivisions((prev) => 
  //     prev.map((d) =>
  //       d.id === division.id ? 
  //         { ...d, content_items: [...d.content_items, { ...newContent, order: d.content_items.length }] } :
  //         d))
  // };

  return (
    <div ref={dropRef}
      className={`flex flex-col w-full grow min-h-[25px] py-5 my-0 space-y-0 `} >
      <div ref={dragRef}
           {...attributes}
           {...listeners}
           className={`w-full cursor-move  hover:bg-foreground/15 flex flex-col justify-center items-start font-medium min-h-15   ${isOver ? "bg-foreground/15" : "bg-foreground/10"} border-[1px] border-accent rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] pb-1.5`}>

        <div className=" w-full flex justify-between items-center">

          <div className="w-full flex flex-row items-center justify-between font-medium text-2xl p-5 ">
            {division.name}[{division.order}]
            <div className="mt-1 flex flex-row items-center -mr-5.5 gap-x-0.5">
              <CreateContentCollection form_status={formG?.published ?? false} 
                                       form_share={formG?.share_url ?? ""} 
                                       division={division}/>
              <button className="mt-0.5 cursor-pointer hover:opacity-70 "
                onClick={async () => {
                  try {
                    await GetPdfDivisionById(division.id);
                    toast.success('PDF раздела успешно запрошен.');} 
                  catch (error) {
                    toast.error('Ошибка при запросе PDF раздела');
                    console.error(error); } }}>
                <TbPdf className="size-8 text-foreground/85" />
              </button>
            </div>
          </div>

          <div className="flex  items-center">
            <Button variant='link' 
                    className="cursor-pointer w-full h-full -mt-10 -mr-3 hover:opacity-20" 
                    onClick={(e) => {
                    e.stopPropagation();
                    handlerDeleteDivision()}}>
              <IoClose  className="size-5 opacity-50"/>
            </Button>
          </div>

        </div>

        <div className="space-y-2.5 min-w-full px-1">
          {(division.content_items || []).map((item) => (
            <CollectionContentWrapper key={item.id}
                                      item={item}
                                      parentDivision={division} />))
          }
        </div>
      </div>

    </div>);
}

export function CollectionContentWrapper({ item, 
                                           parentDivision, }: { item: CollectionContentInstance,
                                                                parentDivision: DivisionInstance }) {
  const { removeCollectionContent } = useConstructor();
  // const [formS, setFormS] = useState<form_submission | null>(null)
  const [isSelected, setIsSelected] = useState<boolean | null>(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(false);

  useEffect(() => {
    async function fetchForm() {
      const formSubmission = await GetFormSubmissionById(item.submission_id);
      // setFormS(formSubmission)
      setIsApproved(formSubmission.approved) }
    fetchForm();  }, [item.submission_id]);
  
  useEffect(() => {
    async function fetchForm() {
      const isSel = await GetIsSelectedById(item.id);
      setIsSelected(isSel) }
    fetchForm(); }, [item.id]   )

  const selectHandler = async () => {
    try {
      const newSelectedState = !isSelected;
      await IsSelectContentCollection(item.id, newSelectedState);
      setIsSelected(newSelectedState);  } 
    catch (error) {
      console.error("Не удалось обновить selected:", error); } };
    
  const approvedHandler = async(e: React.MouseEvent) => {
    e.stopPropagation();  
    try {
      const newApprovedState = !isApproved;
      await IsApprovedFormSubmission(item.submission_id, newApprovedState);
      setIsApproved(newApprovedState);  } 
    catch (error) {
      console.error("Не удалось обновить approved:", error); } };

  const handlePdfClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      toast.error("'PDF контента успешно запрошен.");
      await GetPdfCollectionContentById(item.id);} 
    catch (error) {
      console.error("Ошибка при генерации PDF:", error);
      toast.error("Не удалось сгенерировать PDF"); }
  };      

  const { attributes, listeners,  setNodeRef: dragRef  } = useDraggable({
    id: `cont-${item.id}`,
    data: {
      type: "content",
      divisionId: parentDivision.id,
      contentId: item.id, },
  });

  const { setNodeRef: dropRef } = useDroppable({
    id: `drop-cont-${item.id}`,
    data: {
      type: "content",
      divisionId: parentDivision.id,
      contentId: item.id, },
  });

  return (
    <div ref={(node) => { dragRef(node);
                          dropRef(node); }}
         {...attributes}
         {...listeners}
         onClick={selectHandler}
         className={`  flex justify-between items-center p-2 pl-5  h-10  rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border-[0.10px] cursor-move custom opacity 
           ${isSelected === true  ? "bg-foreground/10" : "bg-red-400/10" }
          `} >

      
      <div className="flex flex-row justify-between space-x-5 font-medium w-full">
        <p >{item.id}[{item.order}]</p>

        <div className={`custom opacity
                         ${isApproved == true ? "bg-green-400/20" : "bg-red-400/20" } 
                         rounded-[8px] focus-visible:ring-0 h-6 cursor-pointer hover:opacity-90 flex flex-row gap-2 items-center justify-center min-w-[170px] w-auto mt-0.5 mr-3 px-2.5`}
             onClick={approvedHandler}>  
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
        <button className="mt-0.5 cursor-pointer hover:opacity-50 "
          onClick={ handlePdfClick }>
          <TbPdf className="size-5 text-foreground/85" />
        </button>
        <button className="cursor-pointer text-red-300 flex justify-center hover:opacity-20"
                onClick={ async(e) => {
                  const targetNames = ["main", 
                                             "Основная","основная",
                                             "Часть","часть", 
                                             "Публикации","публикации", 
                                             "Статьи", "статьи"];
                  e.stopPropagation();
                  try { 
                    if (targetNames.some(name => parentDivision.name.includes(name))) {
                      await DeleteContentCollectionArticle(item.id); }
                    else { await DeleteContentCollection(item.id); }
                    removeCollectionContent(parentDivision.id, item.id);
                    toast.success('Контент успешно удалён');  
                  }

                  catch (error) {
                    toast.error('Ошибка при удалении элемента');
                    console.error(error); }
                }} >
              <IoClose  className="size-5"/>
        </button>
      </div>

    </div>
  );
}






