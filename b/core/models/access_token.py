
from typing import TYPE_CHECKING
from fastapi_users_db_sqlalchemy.access_token import (   SQLAlchemyAccessTokenDatabase,
                                                         SQLAlchemyBaseAccessTokenTable )
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column


from .base import Base

from sqlalchemy.ext.asyncio import AsyncSession
if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession



class AccessToken(Base, SQLAlchemyBaseAccessTokenTable[int]): 

   user_id: Mapped[int] = mapped_column( Integer, 
                                         ForeignKey( "users.id", ondelete="Cascade"),
                                         nullable=False ) 
        
   @classmethod
   def get_db( cls, session: AsyncSession):
      return SQLAlchemyAccessTokenDatabase(session, cls)