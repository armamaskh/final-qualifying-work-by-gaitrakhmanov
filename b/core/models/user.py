from typing import TYPE_CHECKING
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from sqlalchemy.orm import Mapped,  relationship



from .base import Base
from .mixins.int_pk_id import MIXIN_IdIntPK
from .mixins.bool_isAdmin import MIXIN_BoolIsAdministrator


from sqlalchemy.ext.asyncio import AsyncSession
if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession
   from .form import Form
   from .form_submissions import FormSubmission


class User( Base, 
            MIXIN_IdIntPK,  
            MIXIN_BoolIsAdministrator,
            SQLAlchemyBaseUserTable[int]):
   forms: Mapped[list["Form"]] = relationship(back_populates="user")
   form_submissions: Mapped[list["FormSubmission"]] = relationship(back_populates="user")
   
   @classmethod
   def get_db(cls, session: AsyncSession):
      return SQLAlchemyUserDatabase(session, cls)