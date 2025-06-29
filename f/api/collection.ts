import { AxiosInstance } from "./AxiosInstance";
import { collectionSchema, collectionSchemaType } from "@/schemas/collection";
import { collection, section } from "@/types/models";


const API = AxiosInstance("");


export async function CreateCollection(data: collectionSchemaType) {
   const validation = collectionSchema.safeParse(data);
   if (!validation.success) {  throw new Error("Коллекция недействительна.");   }

   const { name, description, cover } = data;

   try {
      const response = await API.axiosPost( "/api/v1/collections", 
                                            { name, description, cover } );
      return response.id;  } 
   catch (error) {
      console.error("Ошибка при создании коллекции:", error);
      throw error; } 
}


export async function GetCollections() {
   try {
      const response = await API.axiosGet("/api/v1/collections");

      return response as Array<collection>;} 
   catch (error) {
      console.error("Ошибка при получении данных о коллекциях!:", error);
      throw error; }
}


export async function GetCollectionById(id: number) {
   try {
      const response = await API.axiosGet(`/api/v1/collections/${id}`);
      return response as collection;   } 
   catch (error) {
      console.error("Ошибка при получении данных о коллекции!:", error);
      throw error; }
}


export async function DeleteCollection(collection_id: number) {
   try {
      await API.axiosDelete(`/api/v1/collections/${collection_id}`); } 
   catch (error) {
      console.error("Ошибка при удалении сборника!:", error);
      throw error; }
}


export async function GetSectionsByCollectionId(collection_id: number) {
   try {
      const response = await API.axiosGet(`/api/v1/collections/${collection_id}/sections`);
      return response as Array<section>; } 
   catch (error) {
      console.error("Ошибка при получении данных о коллекции!:", error);
      throw error; }
}