
from typing import TYPE_CHECKING, Annotated

from fastapi import Depends

from core.models import db_helper
from core.models.access_token import AccessToken
from core.models.user import User

if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession


async def get_access_token_db(
   session: Annotated[  "AsyncSession",
                        Depends(db_helper.session_getter)] ):  
   yield AccessToken.get_db(session=session)