import datetime
from typing import List
from pydantic import BaseModel




class FormBase(BaseModel):
   name: str
   description: str | None = None


class Form(BaseModel):
   id: int
   name: str
   description: str
   content: str
   published: bool
   share_url: str
   visits: int
   submissions: int
   created_at: datetime.datetime
   user_id: int

class AddSubmissions(BaseModel):
   content: str
   user_id: int = 1

class FormSubmissions(AddSubmissions):
   id:int
   form_id: int
   approved: bool
   created_at: datetime.datetime

class FormSubmissionUpdate(BaseModel):
   approved: bool

class FormSubmissionsReq(BaseModel):
   id:int
   approved: bool

class MainForm(BaseModel):
   id: int
   name: str
   content: str
   share_url: str
   form_submissions: List[FormSubmissions]
   visits: int
   submissions: int
   created_at: datetime.datetime


class FormCreate(FormBase):
   published: bool
   


class FormCreate(FormBase):
   pass 

class FormUpdate(FormCreate):
   pass

class FormUpdatePartial(FormCreate):
   name: str  | None = None
   description: str | None = None
   content: str | None = None
   published: bool | None = None
   share_url: str | None = None
   

class FormRead(FormBase):
   id: int

class ArticleCreate(BaseModel):
   name: str
   JsonElements: str
   JsonContent: str
   user_id: int | None = 1

class ArticleCreateReq(BaseModel):
   form_id: int
   submission_id: int



