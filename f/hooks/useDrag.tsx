import {useState, useEffect} from "react";

type DragConstraints  = {
   x?: number,
   y?: number }


type useDrugResult = {
   translate: { x:number, y:number },
   isDragging: boolean,
   dragHandlers: { onTouchStart: (e: React.TouchEvent) => void,
                   onTouchMove: (e: React.TouchEvent) => void,
                   onTouchEnd: () => void,
                   onMouseDown: (e: React.MouseEvent) => void   },
   dragStyles: React.CSSProperties }


export const useDrag = (constraints?: DragConstraints  ): useDrugResult => {
   const [isDragging, setIsDragging] = useState<boolean>(false);
   const [startPosition, setStartPosition] = useState<{x:number, y:number}>({x: 0, y:0});
   const [translate, setTranslate] = useState<{x:number, y:number}>({x: 0, y:0});

   const stiffness = 0.1;
   const defaultConstraints = {x: 10, y: 10};
   const finalConstraints = { ...defaultConstraints, ...constraints };


   const handleStart = (clientX: number, clientY: number) => {
      setIsDragging(true);
      setStartPosition({ x: clientX - translate.x,
                         y: clientY - translate.y });        };
   const handleMove = (clientX: number, clientY: number) =>  {
      if (!isDragging) return;

      let deltaX = clientX - startPosition.x;
      let deltaY = clientY - startPosition.y;

      if (finalConstraints.x !== undefined) {
         deltaX = Math.max(-finalConstraints.x, Math.min(finalConstraints.x, deltaX)); }
      if (finalConstraints.y !== undefined) {
         deltaY = Math.max(-finalConstraints.y, Math.min(finalConstraints.y, deltaY)); }
      setTranslate({ x: deltaX, y: deltaY });                };

   const handleTouchStart = (e: React.TouchEvent) =>         {
      e.preventDefault();
      handleStart(e.touches[0].clientX, e.touches[0].clientY);};

   const handleTouchMove = (e: React.TouchEvent) =>          {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);};

   const handleMouseDown = (e: React.MouseEvent) =>          {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();   
      
      if (!["input", "textarea", "select", "button"].includes(tagName)) {
         e.preventDefault();  }

      handleStart(e.clientX, e.clientY);                     };

   const handleMouseMove = (e: MouseEvent) =>                {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);                      };

   const endDrag = () =>                                     {
      setIsDragging(false);
      setTranslate({ x: 0, y: 0 });                          };


   useEffect(() => {
      if (isDragging) {
         window.addEventListener('mousemove', handleMouseMove, { passive: false });
         window.addEventListener('mouseup', endDrag);
         return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', endDrag);};
      }
   }, [isDragging, startPosition]);

   useEffect(() => {
      if (!isDragging && (translate.x !== 0 || translate.y !== 0)) {
         const animateReturn = () => {
            setTranslate(prev => {
               const newX = prev.x * (1 - stiffness);
               const newY = prev.y * (1 - stiffness);
               
               if (Math.abs(newX) < 0.5 && Math.abs(newY) < 0.5) {
                  return { x: 0, y: 0 };  }
               return { x: newX, y: newY };
            });
            
            if (translate.x !== 0 || translate.y !== 0) {
               requestAnimationFrame(animateReturn);    }
         };
         
         requestAnimationFrame(animateReturn);
      }
   }, [isDragging, translate]);
   

   return {
      translate,
      isDragging,
      dragHandlers: {
         onTouchStart: handleTouchStart,
         onTouchMove: handleTouchMove,
         onTouchEnd: endDrag,
         onMouseDown: handleMouseDown,
      },
      dragStyles: {
         transform: `translate(${translate.x}px, ${translate.y}px)`,
         transition: isDragging ? 'none' : 'transform 0.3s ease-out',
         cursor: isDragging ? 'grabbing' : 'grab',
         userSelect: 'none',
         WebkitUserSelect: 'none',
      }
   };
}
