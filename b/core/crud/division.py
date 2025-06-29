from typing import List
from core.models.collection_content import CollectionContent
from core.models.form import Form
from sqlalchemy import Result, delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models.division import Division
from core.models.form_submissions import FormSubmission
from core.models.section import Section
from core.schemas.division import DivisionCreate, DivisionUpdate, DivisionUpdatePartial, DivisionsUpdatePartial
from core.schemas.form import FormCreate



async def get_divisions(session: AsyncSession) -> list[Division]:
   stmt = select(Division).order_by(Division.id)
   result: Result = await session.execute(stmt)
   division = result.scalars().all()
   return list(division)


async def get_division_by_id(session: AsyncSession, 
                             division_id: int) -> Division | None:
   return await session.get(Division, division_id)


async def get_divisions_for_section(session: AsyncSession, 
                                    section_id: int) -> list[Division]:
   result: Result = await session.execute(
      select(Division)
         .where(Division.section_id == section_id) 
         .order_by(Division.order))
   
   divisions = result.scalars().all()
   return list(divisions)


async def get_divisions_by_formId(session: AsyncSession, 
                                  form_id: int) -> Division:
   result: Result = await session.execute(
      select(Division)
         .where(Division.form_id == form_id) )
   
   divisions = result.scalar_one()
   return divisions

async def get_divisions_for_collection(session: AsyncSession, 
                                       collection_id: int) -> list[Division]:

   result = await session.execute(
      select(Division)
         .where(Division.section_id.in_(select(Section.id)
                                           .where(Section.collection_id == collection_id)
                                           .scalar_subquery() ) )
      .options(selectinload(Division.content_items))
      .order_by(Division.order) );
   
   divisions = result.scalars().all()
   # print(divisions)
   return list(divisions)

async def create_division(session: AsyncSession, 
                          division_in: DivisionCreate, 
                          section_id: int) -> Division:
   
   result = await session.execute(
      select(func.max(Division.order))
         .where(Division.section_id == section_id ) );
   new_order=(result.scalar() or 0) + 1
   
   form = Form(  name = f'Form for {division_in.name}',
                 user_id = 1) #! РЕАЛИЗОВАТЬ АВТОРИЗАЦИЮ
   session.add(form)
   await session.flush()

   division = Division(**division_in.model_dump(), 
                       section_id=section_id,
                       order = new_order,
                       form_id = form.id )
   session.add(division)
   await session.commit()
   await session.refresh(division)

   result = await session.execute(
      select(Division)
         .options(selectinload(Division.content_items))
         .where(Division.id == division.id))
   new_division = result.scalar_one()

   return division

async def create_main_division(session: AsyncSession, 
                          division_in: DivisionCreate, 
                          section_id: int) -> Division:
   
   result = await session.execute(
      select(func.max(Division.order))
         .where(Division.section_id == section_id ) );
   new_order=(result.scalar() or 0) + 1
   
   form = Form(  name = f'Form for {division_in.name}',
                 description = "Форма для статей",
                 published = True,
                 user_id = 1) #! РЕАЛИЗОВАТЬ АВТОРИЗАЦИЮ
   session.add(form)
   await session.flush()

   division = Division(**division_in.model_dump(), 
                       section_id=section_id,
                       order = new_order,
                       form_id = form.id )
   session.add(division)
   await session.commit()
   await session.refresh(division)

   result = await session.execute(
      select(Division)
         .options(selectinload(Division.content_items))
         .where(Division.id == division.id))
   new_division = result.scalar_one()

   await session.commit()

   return division

async def renumber_divisions_in_section(session: AsyncSession, section_id: int):
    result = await session.execute(
        select(Division)
            .where(Division.section_id == section_id)
            .order_by(Division.order))
    divisions = result.scalars().all()

    for i, division in enumerate(divisions, start=1):
        division.order = i
        session.add(division)

    await session.commit()

async def update_division( session: AsyncSession,
                           division: Division,
                           division_updated: DivisionUpdate | DivisionUpdatePartial,
                           partial_flag: bool = False ) -> Division:
   for name, value in division_updated.model_dump(exclude_unset=partial_flag).items():
      setattr(division, name, value)
   await session.commit()
   return division

async def update_divisions( session: AsyncSession,
                            data: DivisionsUpdatePartial, ) :
   for item in data.divisions:
      await session.execute(
         update(Division)
            .where(Division.id == item.id)
            .values(order=item.order) )

   await session.commit()
      


async def delete_division(session: AsyncSession, division_id: int) -> None:

   division = await session.get(Division, division_id)
   if not division:
      return None
   await session.delete(division)
   await session.commit()

   await session.execute(delete(CollectionContent).where(CollectionContent.division_id == division.id))
   await session.execute(delete(FormSubmission).where(FormSubmission.form_id == division.form_id))
   await session.execute(delete(Form).where(Form.id == division.form_id))
   
   await session.commit()

   section_id = division.section_id
   await renumber_divisions_in_section(session, section_id)