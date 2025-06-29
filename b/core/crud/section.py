from fastapi import HTTPException
from sqlalchemy import Result, select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models.collection import Collection
from core.models.section import Section
from core.schemas.sections import SectionCreate, SectionUpdate, SectionUpdatePartial




async def create_section(  session: AsyncSession, 
                              section_in: SectionCreate,
                              collection_id: int) -> Section:
   new_section = Section(**section_in.model_dump(),
                         collection_id = collection_id)
   session.add(new_section)
   await session.commit()
   await session.refresh(new_section)
   return new_section




async def get_sections(session: AsyncSession) -> list[Section]:
   stmt = select(Section).order_by(Section.id)
   result: Result = await session.execute(stmt)
   section = result.scalars().all()
   return list(section)


async def get_sections_for_collection(session: AsyncSession, collection_id: int) -> list[Section]:
   stmt = select(Section).where(Section.collection_id == collection_id)
   result: Result = await session.execute(stmt)
   sections = result.scalars().all()
   return list(sections)


async def get_section_by_id(session: AsyncSession, section_id: int) -> Section | None:
   return await session.get(Section, section_id)


async def update_section( session: AsyncSession, 
                             section: Section, 
                             section_updated: SectionUpdate | SectionUpdatePartial,
                             partial_flag: bool = False) -> Section:
   for name, value in section_updated.model_dump(exclude_unset=partial_flag).items():
      setattr(section, name, value)
   await session.commit()
   return section


async def delete_section( session: AsyncSession,
                             section_in: Section ) -> None:
   await session.delete(section_in)
   await session.commit()
   
