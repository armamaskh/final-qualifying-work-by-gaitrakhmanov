import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DropDownItem {
   text: string;
   value: string;
}

type LabelWeight = 'normal' | 'strong';

interface DropDownProps {
   items: DropDownItem[];
   selectedChanged?: (value: string) => void;
   lblWeight?: LabelWeight;
}

function DropDownMenu({ items, selectedChanged }: DropDownProps) {
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState<DropDownItem>(items[0]);
   const wrapperRef = useRef<HTMLDivElement>(null);

   const toggleOpen = () => setOpen((prev) => !prev);
   const handleSelect = (item: DropDownItem) => {
      setSelected(item);
      selectedChanged?.(item.value);
      setOpen(false);
   };

   return (
      <div className="relative w-35" ref={wrapperRef}>

         <div
            className={cn(
               'absolute -mt-[9.5px] bg-neutral-400/55 backdrop-blur-[1px] [-webkit-backdrop-filter:blur(100px)] rounded-lg shadow-[0px_0px_3px_0px_var(--tw-shadow-color)] shadow-foreground/15  overflow-hidden transition-all duration-200 ease-in-out',
               open ? `max-h-60 ` 
                    : 'max-h-5 '
            )}>
            <div className="flex items-center justify-between px-2 h-5 w-35 cursor-pointer"
                 onClick={toggleOpen}>
               <span className="text-xs truncate">{selected.text}</span>
               <span className="text-xs ml-1">{open ? '▲' : '▼'}</span>
            </div>

            {open && (
               <div className=" overflow-y-auto max-h-56">
                  {items.map((item, idx) => (

                     <div
                        key={idx}
                        onClick={() => handleSelect(item)}
                        className={"px-2 py-1 text-xs cursor-pointer truncate hover:font-bold "}>
                        {item.text}
                     </div>
                  ))}
               </div>
            )}

         </div>
      </div>
   );
}

export default DropDownMenu;



