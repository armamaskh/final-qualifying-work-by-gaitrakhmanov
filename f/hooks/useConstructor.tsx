"use client";

import  { useContext } from 'react'
import {ConstructorContext} from '../components/Context/ConstructorContext';

function useConstructor() {
   const context = useContext(ConstructorContext);

   if (!context) {
      throw new Error("useConstructor must be used withing a ConstructorContext") }

   return context;
}

export default useConstructor