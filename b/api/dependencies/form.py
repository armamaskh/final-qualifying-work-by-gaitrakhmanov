


from typing import Annotated

from fastapi import Depends, Path, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.crud.form import get_form_by_id


async def form_by_id( form_id: Annotated[int, Path], 
                      session: Annotated[  "AsyncSession",
                                           Depends(db_helper.session_getter)]  ):
   
   form = await get_form_by_id(session= session,
                               form_id=form_id)
   if form is not None:
      return form
   
   raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Form {form_id} not found!")