import { AxiosInstance } from "./AxiosInstance";


const API = AxiosInstance("");


interface CollectionContent { id: number; 
                              order: number; }
// interface MoveContentParams { collection_content_id: number;
//                               division_id: number;
//                               order: number; }


export async function  reorderContentCollection(updatedContentCollection: CollectionContent[]) {
   try {
      await API.axiosPatch( '/api/v1/collection_contents', 
         { collection_contents: updatedContentCollection,}); } 
   catch (error) {
      console.error('Ошибка при обновлении порядка элементов:', error);
      throw error; }
}


export async function moveContentItemToOtherDivision( collection_content_id: number, 
                                                      division_id: number, 
                                                      order: number) {
   try {
      await API.axiosPatch( `/api/v1/collection_contents/${collection_content_id}`,
                            { division_id, order } ); } 
   catch (error) {
      console.error('Ошибка при перемещении элемента:', error);
      throw error;}
}


export async function DeleteContentCollection(collection_contents_id: number) {
   try {
      await API.axiosDelete(`/api/v1/collection_contents/${collection_contents_id}`); } 
   catch (error) {
      console.error('Ошибка при удалении элемента контента:', error);
      throw error; }
}


export async function DeleteContentCollectionArticle(collection_contents_id: number) {
   try {
      await API.axiosDelete(`/api/v1/collection_contents_article/${collection_contents_id}`); } 
   catch (error) {
      console.error('Ошибка при удалении статьи контента:', error);
      throw error; }
}


export async function IsSelectContentCollection( collection_contents_id: number, 
                                                 is_selected: boolean ) {
   try {
      await API.axiosPatch(`/api/v1/collection_contents/${collection_contents_id}`,
                           { is_selected }); } 
   catch (error) {
      console.error('Ошибка при обновлении выбора элемента:', error);
      throw error; }
}


export async function GetIsSelectedById(form_submission_id: number): Promise<boolean> {
   try {
      const response = await API.axiosGet(`/api/v1/collection_contents/isS/${form_submission_id}`);
      return response.is_selected; } 
   catch (error) {
      console.error('Ошибка при получении статуса выбора:', error);
      throw error; }
}