


from typing import Annotated

from fastapi import Depends, Path, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.crud.collection import get_collection_by_id
from core.models import db_helper


async def collection_by_id( collection_id: Annotated[int, Path], 
                            session: Annotated[  "AsyncSession",
                                                 Depends(db_helper.session_getter)]  ):
   
   collection = await get_collection_by_id(session= session,
                                           collection_id=collection_id)
   if collection is not None:
      return collection
   
   raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Collection {collection_id} not found!")