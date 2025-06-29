import React from 'react'
import useDesigner from '../../hooks/useDesigner';
import { FormElements } from '../FormElements/FormElements';

function StyleFormToolBar() {

  const {selectedElement} = useDesigner();
  if (!selectedElement) return null;

  const StylesForm = FormElements[selectedElement?.type].stylesComponent;

  
  return (
    
    <div>
      {StylesForm && <StylesForm elementInstance={selectedElement} />}
    </div>
  )
}

export default StyleFormToolBar