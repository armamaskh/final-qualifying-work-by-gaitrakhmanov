import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { division } from '@/types/models';

function DivisionWrapper({ division, sectionId }: { division: division; sectionId: number }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const topHalf = useDroppable({
    id: `division-${division.id}-top`,
    data: {
      isTopHalfDivision: true,
      divisionId: division.id,
      sectionId,
    },
  });

  const bottomHalf = useDroppable({
    id: `division-${division.id}-bottom`,
    data: {
      isBottomHalfDivision: true,
      divisionId: division.id,
      sectionId,
    },
  });

  const draggable = useDraggable({
    id: `division-${division.id}`,
    data: {
      isDivision: true,
      divisionId: division.id,
      sectionId,
    },
  });

  if (draggable.isDragging) return null; // Hide the original item while dragging

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative min-h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset mb-2"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <p className="text-muted-foreground text-sm">Drag to reorder</p>
        </div>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[5px] bg-primary rounded-b-none" />
      )}
      <div
        className={cn(
          'flex w-full min-h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none',
          mouseIsOver && 'opacity-25'
        )}
      >
        <p>{division.name}</p>
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[5px] bg-primary rounded-t-none" />
      )}
    </div>
  );
}

export default DivisionWrapper;