import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import DivisionWrapper from './DivisionWrapper';

function SectionComponent({ section }: { section: any }) {
  const droppable = useDroppable({
    id: `section-${section.id}`,
    data: {
      isSectionDropArea: true,
      sectionId: section.id,
    },
  });

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">{section.name}</h2>
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-background max-w-[97%] h-full m-auto rounded-xl flex flex-col items-center justify-start overflow-y-auto p-4',
          droppable.isOver && 'ring-2 ring-primary/80'
        )}
      >
        {section.divisions.length === 0 && (
          <p className="text-muted-foreground">В этой секции нет разделов</p>
        )}
        {section.divisions.map((division: any) => (
          <DivisionWrapper
            key={division.id}
            division={division}
            sectionId={section.id}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionComponent;