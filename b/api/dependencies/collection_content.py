


from typing import Annotated

from fastapi import Depends, Path, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.crud.collection import get_collection_by_id
from core.crud.collection_content import get_collection_content_by_id
from core.models import db_helper


async def collection_content_by_id(
    content_id:Annotated[int,Path],
    session:Annotated[AsyncSession,Depends(db_helper.session_getter)] ):
    
    content=await get_collection_content_by_id(    session=session,
                                                   col_content_id=content_id)
    if content is not None:
        return content
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Content Collection {content_id} not found!" )
