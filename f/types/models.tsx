
export interface form {
   id: number,
   user_id: number,
   created_at: Date,
   published: boolean,
   name: string,
   description: string,
   content: string,

   visits: number,
   submissions: number,

   share_url: string,
   form_submissions: form_submissions[]
}

export interface form_submission {
   id: number,
   approved: boolean }

export interface form_submissions {
   id: number,
   created_at: Date,
   form_id: number,
   form: form

   content: string
}


export interface collection {
   id: number,
   name: string,
   description: string,

   cover: string,
   authors: string, 
   publisher: string,

   published: boolean,
   adoption_state: boolean,

   created_at: Date,
   sections:  Array<section> | []
}

export interface section {
   id: number,

   name: string,
   section_type: string,
   collection_id: number,
   divisions: Array<division> | []
 }


export interface division {
   id: number,

   name: string,
   section_id: number,
   form_id: number,

   order: number,
   content_items: Array<CollectionContent> }


export interface CollectionContent {
   id: number,
   order: number,
   division_id: number,
   submission_id: number,
   created_at: Date,
   is_selected: boolean }


export type formType = {
   id: number,
   user_id: number,
   created_at: Date,
   published: boolean,
   name: string,
   description: string,
   content: string,

   visits: number,
   submissions: number,

   share_url: string }