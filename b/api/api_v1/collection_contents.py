
from typing import TYPE_CHECKING, Annotated, List
from api.dependencies.collection import collection_by_id
from api.dependencies.collection_content import collection_content_by_id
from api.dependencies.division import division_by_id
from api.dependencies.section import section_by_id
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, Path, status
from core.crud import collection_content
from core.crud import generation_pdf
from core.crud.collection_content import get_contents_for_division
from core.models import db_helper
from core.models.collection import Collection
from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.section import Section
from core.models.user import User
 
from core.schemas.collection import CollectionCreate, CollectionMain, CollectionRead, CollectionUpdate, CollectionUpdatePartial
from api.dependencies.authentication import fastapi_users
from core.schemas.collection_content import CollectionContentCreate, CollectionContentIsS, CollectionContentRead, CollectionContentUpdate, CollectionContentUpdatePartial, CollectionContentsUpdatePartial
from core.schemas.sections import SectionCreate, SectionRead

from .sections import router as section_router

if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter( prefix="/collection_contents",
                            tags=["CollectionContents"])

@router.get(":all",response_model=List[CollectionContentRead])
async def get_collection_contents( session:Annotated[AsyncSession,
                                                     Depends(db_helper.session_getter)]):
    return await collection_content.get_collection_contents(session)

@router.get("/{content_id}",response_model=CollectionContentRead)
async def get_collection_content( content:Annotated[CollectionContent,
                                                    Depends(collection_content_by_id)]):
    return content

@router.get("/isS/{content_id}",response_model=CollectionContentIsS)
async def get_collection_content_isSelected( content:Annotated[CollectionContent,
                                                    Depends(collection_content_by_id)]):
    return content

@router.get("/division/{division_id}",response_model=List[CollectionContentRead])
async def get_contents_by_division(     division_id:Annotated[int,Path],
                                        session:Annotated[AsyncSession,
                                                          Depends(db_helper.session_getter)]):
    return await collection_content.get_contents_for_division( session=session,
                                            division_id=division_id )

@router.post("/division/{division_id}",response_model=CollectionContentRead,status_code=status.HTTP_201_CREATED)
async def create_collection_content(    division:Annotated[Division, Depends(division_by_id)],
                                        content_in:CollectionContentCreate,
                                        session:Annotated[AsyncSession, Depends(db_helper.session_getter)] ):
    return await collection_content.create_collection_content(  session=session,
                                                                content_in=content_in,
                                                                division_id=division.id )

@router.put("/{content_id}",response_model=CollectionContentRead)
async def update_collection_content(     content_updated:CollectionContentUpdate,
                                        content_in:CollectionContent=Depends(collection_content_by_id),
                                        session:AsyncSession=Depends(db_helper.session_getter) ):
    return await collection_content.update_collection_content(     session=session,
                                                content=content_in,
                                                content_updated=content_updated )

@router.patch("/{content_id}",response_model=CollectionContentRead)
async def update_collection_content_partial(    content:Annotated[CollectionContent,
                                                                  Depends(collection_content_by_id)],
                                                content_in:CollectionContentUpdatePartial,
                                                session:Annotated[AsyncSession,
                                                                  Depends(db_helper.session_getter)]):
    return await collection_content.update_collection_content(      session=session,
                                                content=content,
                                                content_updated=content_in,
                                                partial_flag=True )


@router.patch("", status_code=status.HTTP_204_NO_CONTENT)
async def update_collection_contents(data: CollectionContentsUpdatePartial, 
                                     session: Annotated[AsyncSession, Depends(db_helper.session_getter)]): 
       await collection_content.update_collection_contents(session, data)


@router.delete("/{content_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_collection_content(    content:Annotated[CollectionContent,
                                                          Depends(collection_content_by_id)],
                                        session:Annotated[AsyncSession,
                                                          Depends(db_helper.session_getter)] ):
    await collection_content.delete_collection_content( session=session,
                                     content_in=content)

@router.delete("_article/{content_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_collection_content_article( content:Annotated[CollectionContent,
                                                          Depends(collection_content_by_id)],
                                            session:Annotated[AsyncSession,
                                                            Depends(db_helper.session_getter)] ):
    await collection_content.delete_collection_content_article( session=session,
                                     content_in=content)

