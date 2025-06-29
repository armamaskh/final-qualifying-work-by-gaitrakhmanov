from pydantic import BaseModel

from core.schemas.collection_content import CollectionContentRead

class DivisionBase(BaseModel):
   name: str

class DivisionCreate(DivisionBase):
   pass

class DivisionRead(DivisionCreate):
   id: int
   order: int
   section_id: int

class DivisionUpdate(DivisionCreate):
   order: int

class DivisionUpdatePartial(BaseModel):
   name: str | None = None
   order: int | None = None
   form_id: int | None = None
   section_id: int | None = None

class DivisionMain(BaseModel):
   id: int
   name: str
   order: int
   section_id: int
   form_id: int  
   content_items: list[CollectionContentRead] = []


class DivisionsPartial(BaseModel):
   id: int
   order: int 

class DivisionsUpdatePartial(BaseModel):
   divisions: list[DivisionsPartial]

