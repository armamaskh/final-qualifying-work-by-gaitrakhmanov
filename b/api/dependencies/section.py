
from typing import Annotated

from fastapi import Depends, Path, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.crud.section import get_section_by_id


async def section_by_id( section_id: Annotated[int, Path], 
                      session: Annotated[  "AsyncSession",
                                           Depends(db_helper.session_getter)]  ):
   
   section = await get_section_by_id(session= session,
                                     section_id=section_id)
   if section is not None:
      return section
   
   raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Section {section_id} not found!")