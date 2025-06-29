

import datetime
from pydantic import BaseModel


class CollectionContentBase(BaseModel):
   submission_id:int

class CollectionContentCreate(CollectionContentBase):
   pass

class CollectionContentUpdate(CollectionContentBase):
   order:int

class CollectionContentUpdatePartial(CollectionContentBase):
   order: int | None = None
   submission_id: int | None = None
   division_id: int | None = None
   is_selected: bool | None = None

class CollectionContentRead(CollectionContentBase):
   id:int
   order:int
   division_id:int
   created_at:datetime.datetime

class CollectionContentIsS(BaseModel):
   is_selected: bool


class CollectionContentsPartial(BaseModel):
   id: int
   order: int            

class CollectionContentsUpdatePartial(BaseModel):
   collection_contents: list[CollectionContentsPartial]
