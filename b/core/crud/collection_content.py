from typing import List
from sqlalchemy import Result, delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from core.models.collection_content import CollectionContent
from core.models.form_submissions import FormSubmission
from core.schemas.collection_content import CollectionContentCreate, CollectionContentUpdate, CollectionContentUpdatePartial, CollectionContentsUpdatePartial

from sqlalchemy.ext.asyncio import AsyncSession


async def get_collection_contents( session:AsyncSession) -> List[CollectionContent]:
   stmt=select(CollectionContent).order_by(CollectionContent.id)
   result:Result=await session.execute(stmt)
   contents=result.scalars().all()
   return list(contents)

async def get_collection_content_by_id( session:AsyncSession,
                                       col_content_id:int ) -> CollectionContent|None:
   return await session.get(CollectionContent,col_content_id)

async def get_contents_for_division( session:AsyncSession, 
                                 division_id:int ) -> List[CollectionContent]:
   

   result:Result=await session.execute(
      select(CollectionContent)
         .where(CollectionContent.division_id==division_id)
         .order_by(CollectionContent.order)
   )
   contents=result.scalars().all()
   return list(contents)

async def create_collection_content(   session:AsyncSession,
                                    content_in:CollectionContentCreate,
                                    division_id:int ) -> CollectionContent:
   
   result: Result=await session.execute(
      select(func.max(CollectionContent.order))
         .where(CollectionContent.division_id == division_id));
   new_order=result.scalars() or 0;
   
   content=CollectionContent(**content_in.model_dump(),
                           division_id=division_id,
                           order = new_order + 1 )
   session.add(content)
   await session.commit()
   await session.refresh(content)
   return content

async def update_collection_content(session:AsyncSession,
                                    content:CollectionContent,
                                    content_updated:CollectionContentUpdate |
                                       CollectionContentUpdatePartial,
                                    partial_flag:bool=False ) -> CollectionContent:
   for name,value in content_updated.model_dump(exclude_unset=partial_flag).items():
      setattr(content,name,value)
   await session.commit()
   return content


async def update_collection_contents( session: AsyncSession,
                                      data: CollectionContentsUpdatePartial, ) :
   for item in data.collection_contents:
      await session.execute(
         update(CollectionContent)
            .where(CollectionContent.id == item.id)
            .values(order=item.order) )

   await session.commit()


async def renumber_collection_content_in_section(session: AsyncSession, division_id: int):
   result = await session.execute(
      select(CollectionContent)
         .where(CollectionContent.division_id == division_id)
         .order_by(CollectionContent.order))
   
   collection_contents = result.scalars().all()

   for i, collection_content in enumerate(collection_contents, start=1):
      collection_content.order = i
      session.add(collection_content)

   await session.commit()

   
async def delete_collection_content( session:AsyncSession,
                                     content_in:CollectionContent ) -> None:
   division_id = content_in.division_id;
   submission_id = content_in.submission_id;

   await session.delete(content_in)
   await session.commit()

   await session.execute(delete(FormSubmission).where(FormSubmission.id == submission_id ))
   await session.commit()

   await renumber_collection_content_in_section(session, division_id)

      
async def delete_collection_content_article( session:AsyncSession,
                                             content_in:CollectionContent ) -> None:
   division_id = content_in.division_id
   submission_id = content_in.submission_id

   submission = await session.get(FormSubmission, submission_id, options=[joinedload(FormSubmission.form)])

   if submission is None:
        return 
   
   await session.delete(content_in)
    
   if submission.form:
      await session.delete(submission.form)
   await session.delete(submission)

   await session.commit()
   await renumber_collection_content_in_section(session, division_id)



