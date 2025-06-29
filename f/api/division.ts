import { division } from "@/types/models";
import { AxiosInstance } from "./AxiosInstance";
import { DivisionInstance } from "@/components/Context/ConstructorContext";


const API = AxiosInstance(''); 


interface DivisionOrder { id: number;
                          order: number;}
interface CreateDivisionParams { name: string; }


export async function GetDivisionsByCollectionId(collection_id: number): Promise<Array<division>> {
   try {
      const response = await API.axiosGet(`/api/v1/collections/${collection_id}/divisions`);
      return response as Array<division>; } 

   catch (error) {
      console.error("Ошибка при получении разделов коллекции:", error);
      throw error; }
}


export async function GetDivisionByFormId(form_id: number): Promise<division> {
   try {
      const response = await API.axiosGet(`/api/v1/divisions/Division_ByFormId/${form_id}`);
      return response as division; } 
   catch (error) {
      console.error("Ошибка при получении раздела по форме:", error);
      throw error; }
}


export async function GetDivisionsBySectionId(section_id: number): Promise<Array<division>> {
   try {
      const response = await API.axiosGet(`/api/v1/sections/${section_id}/divisions`);
      return response as Array<division>;; } 
   catch (error) {
      console.error("Ошибка при получении разделов секции:", error);
      throw error; }
}


export async function reorderDivisions(updatedDivision: DivisionOrder[]) {
   try {
      await API.axiosPatch('/api/v1/divisions', 
                         { divisions: updatedDivision }); } 
   catch (error) {
      console.error("Ошибка при изменении порядка разделов:", error);
      throw error; }
}


export async function CreateDivision( section_id: number, 
                                      createDivision: CreateDivisionParams): Promise<DivisionInstance> {
   try {
      const response = await API.axiosPost(`/api/v1/sections/${section_id}/divisions`, 
                                         createDivision);
      return response  as DivisionInstance;; } 
   catch (error) {
      console.error("Ошибка при создании раздела:", error);
      throw error; }
}


export async function CreateMainDivision( section_id: number, 
                                          createDivision: CreateDivisionParams): Promise<DivisionInstance> {
   try {
      const response = await API.axiosPost(`/api/v1/sections/${section_id}/divisions/create_main/`, 
                                           createDivision);
      return response as DivisionInstance;; } 
   catch (error) {
      console.error("Ошибка при создании основного раздела:", error);
      throw error; }
}


export async function DeleteDivision(division_id: number) {
   try {
      await API.axiosDelete(`/api/v1/divisions/${division_id}`); } 
   catch (error) {
      console.error("Ошибка при удалении раздела:", error);
      throw error; }
}