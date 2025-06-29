
import datetime
from fastapi_users import schemas
from pydantic import BaseModel



class SectionBase(BaseModel):
   name: str
   section_type: str

class SectionCreate(SectionBase):
   pass

class SectionUpdate(SectionCreate):
   order: int  
   pass

class SectionUpdatePartial(SectionCreate):
   name: str | None = None
   section_type: str | None = None 
   collection_id: int  | None = None  

class SectionRead(SectionCreate):
   id: int
   collection_id: int  

