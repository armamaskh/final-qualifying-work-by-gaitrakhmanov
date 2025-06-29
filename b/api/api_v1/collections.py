
from typing import TYPE_CHECKING, Annotated
from api.dependencies.collection import collection_by_id
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, status
from core.crud import collection, division
from core.models import db_helper
from core.models.collection import Collection
 
from core.schemas.collection import CollectionCreate, CollectionMain, CollectionRead, CollectionUpdate, CollectionUpdatePartial
from core.schemas.division import DivisionMain, DivisionRead

from .sections import router as section_router
from .divisions import router as division_router

if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
   prefix=settings.api.v1.collections,
   tags=["Collections"]    )



@router.post("", response_model=CollectionRead, status_code=status.HTTP_201_CREATED)
async def create_collection(collection_in: CollectionCreate, 
                            session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await collection.create_collection(session=session, collection_in=collection_in)

   
@router.get("", response_model=list[CollectionMain])
async def get_collections(session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    return await collection.get_collections(session)


@router.get("/{collection_id}", response_model=CollectionRead)
async def get_collection(collection: Annotated[Collection, Depends(collection_by_id)]):
    return collection

@router.get("/{collection_id}/divisions", response_model=list[DivisionMain])
async def get_divisions_by_collection(collection: Annotated[Collection, Depends(collection_by_id)],
                                      session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
    return await division.get_divisions_for_collection(session, collection.id)


@router.put("/{collection_id}", response_model= CollectionRead)
async def update_collection(   collection_updated:  CollectionUpdate,
                               collection_in: Collection = Depends(collection_by_id),
                               session: AsyncSession = Depends(db_helper.session_getter) ):
   return await collection.update_collection(session=session,
                                 collection=collection_in,
                                 collection_updated=collection_updated)


@router.patch("/{collection_id}", response_model= CollectionRead)
async def partial_update_collection(  collection_updated:  CollectionUpdatePartial,
                                      collection_in: Collection = Depends(collection_by_id),
                                      session: AsyncSession = Depends(db_helper.session_getter) ):
   return await collection.update_collection( session=session,
                                   collection=collection_in,
                                   collection_updated=collection_updated,
                                   partial_flag=True)


@router.delete("/{collection_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_collection(collection_in: Annotated[Collection, Depends(collection_by_id)], 
                            session: Annotated[AsyncSession, Depends(db_helper.session_getter)]):
    await collection.delete_collection(session, collection_in)




router.include_router(section_router, prefix="/{collection_id}")

