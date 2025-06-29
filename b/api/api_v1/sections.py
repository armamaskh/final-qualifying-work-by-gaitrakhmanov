
from typing import TYPE_CHECKING, Annotated
from api.dependencies.collection import collection_by_id
from api.dependencies.section import section_by_id
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, status
from core.crud import section
from core.models import db_helper
from core.models.collection import Collection
from core.models.section import Section
 
from core.schemas.sections import SectionCreate, SectionRead, SectionUpdate, SectionUpdatePartial

from .divisions import router as division_router

if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter( prefix=settings.api.v1.sections, 
                    tags=["Sections"]    )



@router.get(":all", response_model=list[SectionRead])
async def get_sections(session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await section.get_sections(session)

@router.get("/{section_id}", response_model=SectionRead)
async def get_section(section: Annotated[Section, Depends(section_by_id)]):
    return section

@router.get("", response_model=list[SectionRead])
async def get_sections_by_collection(collection: Annotated[Collection, Depends(collection_by_id)], 
                                     session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await section.get_sections_for_collection(session, collection.id)

@router.post("", response_model=SectionRead, status_code=status.HTTP_201_CREATED)
async def create_section(collection: Annotated[Collection, Depends(collection_by_id)], 
                         section_in: SectionCreate, 
                         session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await section.create_section(session=session, section_in=section_in, collection_id=collection.id)

@router.put("/{section_id}", response_model= SectionRead)
async def update_section(   section_updated:  SectionUpdate,
                            section_in: Section = Depends(section_by_id),
                            session: AsyncSession = Depends(db_helper.session_getter) ):
   return await section.update_section(session=session, section=section_in, section_updated=section_updated)

@router.patch("/{section_id}", response_model=SectionRead)
async def update_section(sectiondf: Annotated[Section, Depends(section_by_id)], 
                         section_in: SectionUpdatePartial, 
                         session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await section.update_section(session=session, section=sectiondf, section_updated=section_in, partial_flag=True)

@router.delete("/{section_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_section(section_in: Annotated[Section, Depends(section_by_id)], 
                         session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    await section.delete_section(session, section_in)



router.include_router( division_router, prefix="/{section_id}" )