import React from 'react'
import useDesigner from '../../../hooks/useDesigner'
import PropertiesFormSidebar from './PropertiesFormSidebar';
import FormElementsSidebar from './FormElementsSidebar';

function DesignerSidebar() {
  const {selectedElement} = useDesigner();
  return (
    
    <aside className='  max-h-[1065px] 
                        w-[400px] 
                        flex flex-col flex-grow 
                        gap-2 border-l-2 border-muted 
                        p-4 bg-background overflow-y-auto
                        rounded-bl-[10px]'>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && (<PropertiesFormSidebar />)}
    </aside>
  )
}

export default DesignerSidebar