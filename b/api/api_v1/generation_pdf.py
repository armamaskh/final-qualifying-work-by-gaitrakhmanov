from typing import TYPE_CHECKING, Annotated

from fastapi.responses import FileResponse
from api.dependencies.collection import collection_by_id
from api.dependencies.collection_content import collection_content_by_id
from api.dependencies.division import division_by_id
from api.dependencies.section import section_by_id
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, HTTPException
from core.crud.generation_pdf import generate_pdf
from core.models import db_helper
from core.models.collection import Collection
from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.section import Section
 


if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
   prefix=settings.api.v1.generation,
   tags=["GenerationPDF"]    )

@router.get("/collection/{collection_id}", response_class=FileResponse)
async def render_collection_pdf( collection: Annotated[Collection, Depends(collection_by_id)],
                                 session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
   try:
      return await generate_pdf( collection_id=collection.id,
                                 session=session,
                                 level="collection")
   except HTTPException as e:
      raise e
   except Exception as e:
      raise HTTPException(  status_code=500,
                            detail=f"Error generating PDF: {str(e)}")
   
@router.get("/section/{section_id}", response_class=FileResponse)
async def render_section_pdf( section: Annotated[Section, Depends(section_by_id)],
                              session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
   try:
      return await generate_pdf( section_id=section.id,
                                 session=session,
                                 level="section")   
   except HTTPException as e:
      raise e
   except Exception as e:
      raise HTTPException(  status_code=500,
                            detail=f"Error generating PDF: {str(e)}")
   
@router.get("/division/{division_id}", response_class=FileResponse)
async def render_section_pdf( division: Annotated[Division, Depends(division_by_id)],
                              session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
   try:
      return await generate_pdf( division_id=division.id,
                                 session=session,
                                 level="division")   
   except HTTPException as e:
      raise e
   except Exception as e:
      raise HTTPException(  status_code=500,
                            detail=f"Error generating PDF: {str(e)}")
   
@router.get("/collection_content/{content_id}", response_class=FileResponse)
async def render_section_pdf( collection_content: Annotated[CollectionContent, Depends(collection_content_by_id)],
                              session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
   try:
      return await generate_pdf( collection_content_id=collection_content.id,
                                 session=session,
                                 level="collection_content")   
   except HTTPException as e:
      raise e
   except Exception as e:
      raise HTTPException(  status_code=500,
                            detail=f"Error generating PDF: {str(e)}")