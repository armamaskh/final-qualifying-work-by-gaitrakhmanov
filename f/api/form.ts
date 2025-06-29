"use server";
// import { currentUser } from "@clerk/nextjs/server";
import { AxiosInstance } from "./AxiosInstance";
import { formSchema, formSchemaType } from "@/schemas/form";
import { form, form_submission } from "@/types/models";
import { currentUser } from "@clerk/nextjs/server";


const API = AxiosInstance('');


class UserNotFoundErr extends Error { }

interface FormStats { visits: number;
                      submissions: number;
                      submissionRate: number;
                      bounceRate: number; }


export async function GetFormStats(): Promise<FormStats> {
   // const user = await currentUser();
   // if (!user) throw new UserNotFoundErr();

   try {
      const response = await API.axiosGet("/api/v1/forms/GetFormStats");
      return {
         visits: response.visits || 0,
         submissions: response.submissions || 0,
         submissionRate: response.submissionsRate || 0,
         bounceRate: response.bounceRate || 0   }; }
   catch (error) {
      console.error("Не удалось получить статистику формы:", error);
      return { visits: 0, submissions: 0, submissionRate: 0, bounceRate: 0 }; }
}


export async function CreateForm(data: formSchemaType) {
   try {
      const validation = formSchema.safeParse(data);
      if (!validation.success) throw new Error("Некорректные данные формы");
      
 
      
      const response = await API.axiosPost("/api/v1/forms", 
                                           { name: data.name, 
                                             description: data.description });
      return response.id as number;; }
   catch (error) {
      console.error("Ошибка при создании формы:", error);
      throw error; }
}


export async function GetForms() {
   try {
      const response = await API.axiosGet("/api/v1/forms");
      return response as Array<form>; }
   catch (error) {
      console.error("Ошибка при получении списка форм:", error);
      throw error; }
}


export async function GetFormById(id: number) {
   const user = await currentUser();
   if (!user) { throw new UserNotFoundErr(); }
   try {
      const response = await API.axiosGet(`/api/v1/forms/${id}`);
      return response as form; }
   catch (error) {
      console.error(`Ошибка при получении формы ${id}:`, error);
      throw error; }
}


export async function UpdateFormContent(id: number, jsonContent: string) {
   try {

      
      const response = await API.axiosPatch( `/api/v1/forms/${id}`, 
                                             { content: jsonContent } );
      return response as form; }
   catch (error) {
      console.error(`Ошибка при обновлении формы ${id}:`, error);
      throw error; }
}


export async function PublishForm(id: number) {
   try {
      const response = await API.axiosPatch( `/api/v1/forms/${id}`, 
                                             { published: true } );
      return response as form; }
   catch (error) {
      console.error(`Ошибка при публикации формы ${id}:`, error);
      throw error; }
}


export async function GetFormContentByUrl(form_shareUrl: string) {
   try {
      const response = await API.axiosGet(`/api/v1/forms/${form_shareUrl}/formContent`);
      return response as form; }
   catch (error) {
      console.error(`Ошибка при получении формы по URL ${form_shareUrl}:`, error);
      throw error; }
}


export async function SubmitForm(form_shareUrl: string, content: string) {
   try {
      await API.axiosPost( `/api/v1/forms/${form_shareUrl}/addSubmission`, 
                           { content }); }
   catch (error) {
      console.error(`Ошибка при отправке формы ${form_shareUrl}:`, error);
      throw error; }
}


export async function CreateArticleAndFormForHer(  form_shareUrl: string, 
                                                   article_in: {  name: string, 
                                                                  JsonElements: string, 
                                                                  JsonContent: string } ) {
   try {
      const response = await API.axiosPost(  `/api/v1/forms/${form_shareUrl}/addArticle`, 
                                             article_in );
      return response as { form_id: number, submission_id: number }; }
   catch (error) {
      console.error(`Ошибка при создании статьи для формы ${form_shareUrl}:`, error);
      throw error; }
}


export async function GetFormWithSubmissions(id: number) {
   try {

      
      const response = await API.axiosGet(`/api/v1/forms/${id}/formSubmissions`);
      return response as form; }
   catch (error) {
      console.error(`Ошибка при получении формы ${id} с ответами:`, error);
      throw error; }
}


export async function GetFormSubmissionById(form_submission_id: number) {
   try {
      const response = await API.axiosGet( `/api/v1/forms/formSubmission/${form_submission_id}` );
      return response as form_submission; }
   catch (error) {
      console.error(`Ошибка при получении ответа ${form_submission_id}:`, error);
      throw error; }
}


export async function IsApprovedFormSubmission(form_submission_id: number, is_approved: boolean) {
   try {
      await API.axiosPatch(   `/api/v1/forms/formSubmission/${form_submission_id}`, 
                              { approved: is_approved }  ); }
   catch (error) {
      console.error(`Ошибка при обновлении статуса ответа ${form_submission_id}:`, error);
      throw error; }
}