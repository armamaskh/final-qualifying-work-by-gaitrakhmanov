
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship, declared_attr

from typing import TYPE_CHECKING
if TYPE_CHECKING:
   from core.models.user import User

class RELATION_MIXIN_USER:
   _user_id_unique_: bool = False
   _user_id_nullable_: bool = False
   _user_back_populates_: str | None = None

   @declared_attr
   def user_id(cls) -> Mapped[int]:
      return mapped_column( Integer, 
                            ForeignKey("users.id"),
                            unique=cls._user_id_unique_,
                            nullable=cls._user_id_nullable_)
   
   @declared_attr
   def user(cls) -> Mapped["User"]:
      return relationship( "User", 
                           back_populates= cls._user_back_populates_)
   
