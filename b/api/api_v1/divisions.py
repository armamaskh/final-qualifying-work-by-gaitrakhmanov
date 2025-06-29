from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, Path, status

from api.dependencies.collection import collection_by_id
from api.dependencies.form import form_by_id
from core.config import settings
from core.models import db_helper
from core.crud import division 
from core.models.collection import Collection
from core.models.division import Division
from core.models.form import Form
from core.models.section import Section
from core.schemas.division import DivisionCreate, DivisionMain, DivisionRead, DivisionUpdate, DivisionUpdatePartial, DivisionsUpdatePartial
from api.dependencies.division import division_by_id, verify_division_section
from api.dependencies.section import section_by_id

router = APIRouter(
    prefix=settings.api.v1.divisions,
    tags=["Divisions"])



@router.get(":all", response_model=list[DivisionRead])
async def get_divisions(session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
    return await division.get_divisions(session)

@router.get("/{division_id}", response_model=DivisionRead)
async def get_division(division: Annotated[Division, Depends(division_by_id)]): 
    return division

@router.get("", response_model=list[DivisionRead])
async def get_divisions_by_section(section: Annotated[Section, Depends(section_by_id)], 
                                   session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
    return await division.get_divisions_for_section(session, section.id)

@router.get("/Division_ByFormId/{form_id}", response_model=DivisionRead)
async def get_divisions_by_section(form: Annotated[Form, Depends(form_by_id)], 
                                   session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
    return await division.get_divisions_by_formId(session, form.id)

@router.post("",response_model=DivisionMain, status_code=status.HTTP_201_CREATED)
async def create_division( section: Annotated[Section, Depends(section_by_id)], 
                           division_in: DivisionCreate, 
                           session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await division.create_division(session=session, 
                                          division_in=division_in, 
                                          section_id=section.id)

@router.post("/create_main/",response_model=DivisionMain, status_code=status.HTTP_201_CREATED)
async def create_main_division( section: Annotated[Section, Depends(section_by_id)], 
                           division_in: DivisionCreate, 
                           session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await division.create_main_division(session=session, 
                                          division_in=division_in, 
                                          section_id=section.id)

@router.patch("/{division_id}", response_model=DivisionRead)
async def update_division(division_in: Annotated[Division, Depends(division_by_id)], 
                          division_updated: DivisionUpdatePartial, 
                          session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):

    return await division.update_division(session=session, 
                                          division=division_in, 
                                          division_updated=division_updated, 
                                          partial_flag=True)


@router.patch("", status_code=status.HTTP_204_NO_CONTENT)
async def update_divisions(data: DivisionsUpdatePartial, 
                           session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
       await division.update_divisions(session, data)


@router.put("/{division_id}" )
async def update_patch_division(   division_in: Annotated[Division, Depends(division_by_id)],
                                   division_updated: DivisionUpdate,
                                   session: Annotated[AsyncSession, Depends(db_helper.session_getter)] ):
    return await division.update_division(session=session, 
                                          division=division_in, 
                                          division_updated=division_updated, partial_flag=False)

@router.delete("/{division_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_division(division_in: Annotated[Division, Depends(division_by_id)], 
                          session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
       await division.delete_division(session, division_in.id)


