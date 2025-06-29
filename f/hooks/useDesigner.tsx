"use client";

import  { useContext } from 'react'
import { DesignerContext } from '../components/Context/DesignerContext';

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
      throw new Error("useDesigner must be used withing a DesignerContext")}
  return context;
}

export default useDesigner