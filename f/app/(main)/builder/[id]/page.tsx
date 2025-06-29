

import { GetFormById } from '@/api/form';
import DesignerContextProvider from '@/components/Context/DesignerContext';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import React from 'react'

interface BuilderPageProps {
  params: Promise<{ id: string }>;
}

async function BuilderPage( { params }: BuilderPageProps ) {
  const {id} = await params;
  
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Форма не найдена");}

  return (
    <DesignerContextProvider>
      <FormBuilder form={form} />
    </DesignerContextProvider>);
}

export default BuilderPage;



// "use client";

// import React, { useEffect, useState } from "react";
// import { GetFormById } from "@/api/form";
// import DesignerContextProvider from "@/components/Context/DesignerContext";
// import FormBuilder from "@/components/FormBuilder/FormBuilder";
// import { form } from "@/types/models";



// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// async function BuilderPage({ params }:  PageProps) {
//   const { id } = React.use(params);
//   const [formData, setFormData] = useState<form | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     GetFormById(Number(id))
//       .then((data) => setFormData(data))
//       .catch(() => setError("Форма не найдена"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>{error}</div>;
//   if (!formData) return <div>Форма не найдена</div>;

//   return (
//     <DesignerContextProvider>
//       <FormBuilder form={formData} />
//     </DesignerContextProvider>
//   );
// }

// export default BuilderPage;
