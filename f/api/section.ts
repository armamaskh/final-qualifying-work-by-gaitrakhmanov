import { sectionSchema, sectionSchemaType } from "@/schemas/section";
import { AxiosInstance } from "./AxiosInstance";


const API = AxiosInstance('');

export async function CreateSection(   collection_id: number,
                                       data: sectionSchemaType )  {
   const validation = sectionSchema.safeParse(data);
   if (!validation.success) { throw new Error("Section data is not valid"); }

   const { name, section_type } = data;

   try {
      await API.axiosPost( `/api/v1/collections/${collection_id}/sections`,
                                                { name, section_type }   ); }
   catch (error) {
      console.error("Не удалось создать раздел:", error);
      throw error; }
}


export async function DeleteSection(section_id: number): Promise<void> {
   try {
      await API.axiosDelete(`/api/v1/sections/${section_id}`); }
   catch (error) {
      console.error("Не удалось удалить раздел:", error);
      throw error; }
}