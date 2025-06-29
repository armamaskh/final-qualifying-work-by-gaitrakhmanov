"use client";
import {  ReactNode, useState } from "react";
import IconSearch from "./IconSearch/IconSearch";



function SearchBar({children}: {children: ReactNode}) {

   const [isSelected, setIsSelected] = useState(0);

   return (
            <div
               className={`w-full h-7 rounded-lg border-[0.20px] border-neutral-400 shadow-inset 
                  ${
                     isSelected
                        ? "bg-zinc-300/75 shadow-[inset_0px_0px_2px_0px_rgba(0,0,0,0.25)]"
                        : "bg-zinc-300/50 shadow-[inset_0px_0px_2.5px_0px_rgba(0,0,0,0.25)]"
                  } flex items-center px-2 justify-between`}
                  onFocus={() => setIsSelected(1)}
                  onBlur={() => setIsSelected(0)}
                  tabIndex={0}>
               <div>{children}</div>
               <IconSearch />
            </div>
         );
}

export default SearchBar 
