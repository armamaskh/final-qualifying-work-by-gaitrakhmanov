import datetime
from fastapi_users import schemas
from pydantic import BaseModel

from core.schemas.sections import SectionRead


class CollectionBase(BaseModel):
   name: str
   description: str | None = None
   cover: str | None = None


class CollectionMain(CollectionBase):
   id:int
   authors: str | None = None
   publisher: str | None = None
   created_at: datetime.datetime
   sections: list[SectionRead] = []

class CollectionCreate(CollectionBase):
   pass

class CollectionUpdate(CollectionCreate):
   pass

class CollectionUpdatePartial(CollectionCreate):
   name: str | None = None
   description: str | None = None   
   cover: str | None = None
   authors: str | None = None
   publisher: str | None = None

class CollectionRead(CollectionBase):
   id:int
   authors: str | None = None
   publisher: str | None = None
   created_at: datetime.datetime
