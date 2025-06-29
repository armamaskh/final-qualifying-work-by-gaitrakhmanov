import datetime
from fastapi import HTTPException
from sqlalchemy import Result, insert, select, event
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload


from core.models import Collection
from core.models.form import Form
from core.models.form_submissions import FormSubmission
from core.models.section import Section
from core.models.user import User
from core.schemas.collection import CollectionBase, CollectionCreate, CollectionUpdate, CollectionUpdatePartial
from core.schemas.sections import SectionCreate

from sqlalchemy.ext.asyncio import AsyncSession
from core.models.division import Division



async def get_collections(session: AsyncSession) -> list[Collection]:
   
   result: Result = await session.execute(
      select(Collection)
         .options( selectinload(Collection.sections) )
         .order_by(Collection.id))
   
   collection = result.scalars().all()
   return list(collection)



async def get_collection_by_id(session: AsyncSession, collection_id: int) -> Collection | None:
   result = await session.get(Collection, collection_id)
   await session.commit()
   
   return result



async def create_collection(  session: AsyncSession, 
                              collection_in: CollectionCreate) -> Collection:
   new_collection = Collection(**collection_in.model_dump())
   session.add(new_collection)
   await session.commit()
   await session.refresh(new_collection)
   return new_collection



async def update_collection( session: AsyncSession, 
                             collection: Collection, 
                             collection_updated: CollectionUpdate | CollectionUpdatePartial,
                             partial_flag: bool = False) -> Collection:
   for name, value in collection_updated.model_dump(exclude_unset=partial_flag).items():
      setattr(collection, name, value)
   await session.commit()
   return collection



async def delete_collection( session: AsyncSession,
                             collection_in: Collection ) -> None:
   await session.delete(collection_in)
   await session.commit()
   
