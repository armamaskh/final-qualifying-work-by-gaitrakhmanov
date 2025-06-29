from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.models.division import Division
from core.crud import division as crud_division

async def division_by_id( division_id: int,
                          session: AsyncSession = Depends(db_helper.session_getter),) -> Division:
   division = await crud_division.get_division_by_id(session, division_id)
   if division is None:
      raise HTTPException(
         status_code=status.HTTP_404_NOT_FOUND,
         detail=f"Division {division_id} not found"
      )
   return division

async def verify_division_section(
   division: Division = Depends(division_by_id),
   section_id: int | None = None, ) -> Division:
   if section_id is not None and division.section_id != section_id:
      raise HTTPException(
         status_code=status.HTTP_400_BAD_REQUEST,
         detail=f"Division {division.id} does not belong to section {section_id}"
      )
   return division