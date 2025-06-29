import { AxiosInstance } from "./AxiosInstance";

const API = AxiosInstance('');


const downloadPdfFile = (blob: Blob, fileName: string) => {
   const url = window.URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = url;
   link.download = fileName;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(url);
};

export async function GetPdfCollectionById(collection_id: number) {
   try {
      const response = await API.axiosBlob(  `/api/v1/generation/collection/${collection_id}`);
      downloadPdfFile(response, `collection_${collection_id}.pdf`);}
   catch (error) {
      console.error("Ошибка при генерации PDF коллекции:", error);
      throw error;}
}

export async function GetPdfSectionById(section_id: number) {
   try {
      const API = AxiosInstance('');
      const response = await API.axiosBlob(   `/api/v1/generation/section/${section_id}` );
      downloadPdfFile(response, `section_${section_id}.pdf`); }
   catch (error) {
      console.error("Ошибка при генерации PDF секции:", error);
      throw error; }
}


export async function GetPdfDivisionById(division_id: number) {
   try {
      const API = AxiosInstance('');
      const response = await API.axiosBlob(   `/api/v1/generation/division/${division_id}` );
      downloadPdfFile(response, `division_${division_id}.pdf`); }
   catch (error) {
      console.error("Ошибка при генерации PDF раздела:", error);
      throw error; }
}


export async function GetPdfCollectionContentById(content_id: number) {
   try {
      const API = AxiosInstance('');
      const response = await API.axiosBlob(   `/api/v1/generation/collection_content/${content_id}` );
      downloadPdfFile(response, `collection_content_${content_id}.pdf`); }
   catch (error) {
      console.error("Ошибка при генерации PDF контента:", error); };
}  
   