"use client";

import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { ElementsType, FormElementInstance, FormElements } from "./FormElements/FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { CreateArticleAndFormForHer, SubmitForm } from "@/api/form";
import useDesigner from "../hooks/useDesigner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"; 
import { idGenerator } from "@/lib/idGenerator";
import CustomToolBar from "./CustomToolBar";
import StyleFormToolBar from "./FormBuilder/StyleFormToolBar";
import { FaPlus } from "react-icons/fa6";
import { MdSwapVert } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";



function FormSubmitComponents({ formUrl,
                                content,
                                isMainSection,}: {  formUrl: string;
                                                    content: FormElementInstance[];
                                                    isMainSection: boolean;}) {

  const { elements, setSelectedElement, selectedElement, addElement, setElements, removeElement } = useDesigner();
  const [openAddDialog, setOpenAddDialog] = useState<number | null>(null);
  
  useEffect(() => {
    setElements(content);  }, [content, setElements])
                                                      
  const formValues = useRef<{[key: string]: string}>({});
  const formErrors = useRef<{[key: string]: boolean}>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateValue: () => boolean = useCallback( () => {
    for ( const field of content) {
      const actualValues = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValues);
      if(!valid) { formErrors.current[field.id] = true;}    }

    if(Object.keys(formErrors.current).length > 0) {
      return false;}

    return true; 
  }, [content] )

  const submitValue = useCallback((key: string, value: string) => {
      formValues.current[key] = value; }, []) 

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateValue();
    if(!validForm ) {
      setRenderKey(new Date().getTime());
      toast.error("Пожалуйста, проверьте форму на наличие незаполненных полей")
      return; }

    try{
      if(isMainSection) {
        const JsonElements = JSON.stringify(elements);
        const JsonContent = JSON.stringify(formValues.current);

        await CreateArticleAndFormForHer(formUrl, {name: `${Date.now()}`, 
                                                   JsonElements: JsonElements, 
                                                   JsonContent: JsonContent});
        setSubmitted(true);
        toast.success("Статья успешно отправлена!");


      }
      else {  const jsonContent = JSON.stringify(formValues.current);
              await SubmitForm(formUrl, jsonContent);
              setSubmitted(true);
              toast.success("Данные успешно отправлены!");}
    }      
    catch(error) {
      toast.error("Что-то пошло не так.");
      console.error(error);     }
  }

  const handlerAddElement = (type: ElementsType) => {
    if (openAddDialog === null) return;
    const newElement = FormElements[type].construct(idGenerator());
    addElement(openAddDialog, newElement);
    setOpenAddDialog(null); };

  if(submitted) {
    return (
      <div className='flex justify-center w-full h-full items-center p-8'>
        <div className='max-w-[690px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-foreground-200 rounded-2xl'>
          <h1 className="text-2xl font-bold">Заполненная форма отправлена!</h1>
          <p className='text-muted-foreground'>Благодарим вас за отправку формы, теперь вы можете закрыть эту страницу</p>
        </div>
      </div>);
  }

  const swapAdjacentElements = (index: number) => {
    if (index <= 0 || index > elements.length - 1) {
      toast.error("Невозможно поменять местами элементы!");
      return; }
    const newElements = [...elements];
    [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
    setElements(newElements);
    toast.success("Элементы успешно поменялись местами!"); };   
   

  return (
    <div className='flex justify-center flex-col w-full h-full items-center '>
      {isMainSection  &&  <div className="mb-5 sticky top-5 z-10">
                            <CustomToolBar>
                              {selectedElement && <StyleFormToolBar />}
                              {!selectedElement && <p className="font-medium text-xl text-foreground text-center w-full">
                                                      Создание публикации\статьи для сборника
                                                    </p>}
                            </CustomToolBar>
                          </div> }
      <div key={renderKey}
            onClick={() => setSelectedElement(null)} 
           className="max-w-[827px] flex flex-col gap-2 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-foreground-200 rounded-xl">



         {  !isMainSection && content.map( element => {
              const FormElement = FormElements[element.type].formComponent;
              return <FormElement key={element.id} 
                                  elementInstance={element} 
                                  submitValue={submitValue}
                                  isInvalid={formErrors.current[element.id]}
                                  defaultValue={formValues.current[element.id]} />; })
          }



          { isMainSection && 
            <>
              <AddElementButton  index={0} onClick={() => setOpenAddDialog(0)} isBoundary={true} />

              <div className="flex flex-col w-full ">
                {elements.map((element, index) => (
                  <React.Fragment key={element.id}>
                    <FormElement  element={element}
                                  formValues={formValues}
                                  formErrors={formErrors}
                                  onRemove={() => removeElement(element.id)} />
                    {index < elements.length - 1 && (
                      <AddElementButton index={index + 1} isBoundary={false}
                                        onClick={() => setOpenAddDialog(index + 1)}
                                        onSwapClick={() => swapAdjacentElements(index + 1)} /> )}
                  </React.Fragment> ))}
              </div>

              {elements.length > 0 && (
              <AddElementButton index={elements.length} isBoundary={true}
                                onClick={() => setOpenAddDialog(elements.length)} /> )}

            <Dialog open={openAddDialog !== null} 
                    onOpenChange={(open) => setOpenAddDialog(open ? openAddDialog : null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Выберите элемент формы</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 p-4">
                  {(Object.keys(FormElements) as ElementsType[]).map((type) =>{ 
                    if(type !== "CheckBoxField" && type !== "SelectField"){
                      const {label, icon: Icon} = FormElements[type].designerBtnElement

                      return <Button key={type} className="cursor-pointer hover:opacity-70"
                                     onClick={() => handlerAddElement(type)} >
                                <Icon />                      
                                {label}
                              </Button>} })}
                </div>
              </DialogContent>
            </Dialog>

            </>
          }



         <Button className='mt-8'
                 onClick={() => { startTransition(submitForm); }}
                 disabled={pending}>
            {!pending && <> 
                            <HiCursorClick className='mr-2'/>
                            Submit 
                         </>}
            { pending &&  <ImSpinner2 className='animate-spin' />}
         </Button>

      </div>
    </div>
  )
}

export default FormSubmitComponents;


function FormElement({
  element,
  formValues,
  formErrors,
  onRemove, }: {
  element: FormElementInstance;
  formValues: React.MutableRefObject<{ [key: string]: string }>;
  formErrors: React.MutableRefObject<{ [key: string]: boolean }>;
  onRemove?: () => void; }) {

  const {setSelectedElement} = useDesigner()
  const FormComponent = FormElements[element.type].formComponent;
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [isDialogOpen, setIsDialogOpen] = useState(false); // локальный диалог

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
    setRenderKey(new Date().getTime());
  }, [formValues, setRenderKey]);

  const PropertiesComponent = FormElements[element.type].propertiesComponent;

  return (
    <div
      className="relative flex flex-col p-1"
      onClick={(e) => {    e.stopPropagation();
                          setSelectedElement(element);}}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
      }}
    >
      <FormComponent
        key={renderKey}
        elementInstance={element}
        submitValue={submitValue}
        isInvalid={formErrors.current[element.id]}
        defaultValue={formValues.current[element.id]}
        
      />

      <Button
        variant="link"
        className="absolute right-0 top-0 h-6 w-6 p-0 cursor-pointer hover:opacity-25"
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
      >
        <IoClose className="size-5 opacity-50" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Свойства</DialogTitle>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-3 right-3"
              onClick={() => setIsDialogOpen(false)}
            >
              <AiOutlineClose />
            </Button>
          </DialogHeader>
          {PropertiesComponent && (
            <div className="mt-4">
              <PropertiesComponent elementInstance={element} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


function AddElementButton({ index,
                            onClick,
                            isBoundary,
                            onSwapClick, }: { index: number;
                                              onClick: () => void;
                                              isBoundary: boolean;
                                              onSwapClick?: () => void; }) {
  return (
    <div className="relative w-full h-8 flex items-center justify-center z-20 group" >
      <div className={` absolute h-[2px] bg-gray-300 transition-all duration-200 
          group-hover:h-[4px] group-hover:scale-x-105 cursor-pointer
          ${isBoundary ? "w-100" : "w-40"} `} />

      <Button onClick={onClick}
              className="absolute cursor-pointer left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-white hover:bg-foreground opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all duration-200 z-50" >
        <FaPlus className="h-4 w-4" />
      </Button>

      {!isBoundary && index > 0 && ( <Button  onClick={onSwapClick}
                                              className="absolute cursor-pointer left-1/2 transform translate-x-10 h-8 w-8 rounded-full bg-primary text-white hover:bg-foreground/70 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all duration-200 z-50">
          <MdSwapVert className="h-15 w-15" />
        </Button> )}
    </div>
  );
}
