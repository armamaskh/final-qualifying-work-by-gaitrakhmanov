from typing import TYPE_CHECKING, Optional
from core.models.base import Base
from core.models.mixins.date_created_updated_at import MIXIN_DatetimeCreatedAt
from core.models.mixins.int_pk_id import MIXIN_IdIntPK

from sqlalchemy import Boolean, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
   from .section import Section



class Collection(Base, MIXIN_IdIntPK, MIXIN_DatetimeCreatedAt):
   name: Mapped[str]

   description: Mapped[str] = mapped_column(String(1000), default="",
                                                          server_default="")
   
   cover: Mapped[str] = mapped_column(String, default="",
                                              server_default="")
   
   authors: Mapped[str] = mapped_column(String, 
                                          nullable=True, 
                                          default="",
                                          server_default="")  
   publisher: Mapped[str] = mapped_column(String(300), 
                                          nullable=True, 
                                          default="",
                                          server_default="")

   
   published: Mapped[bool] = mapped_column(Boolean, 
                                           default=False,
                                           server_default=text("False"))
   
   adoption_state: Mapped[bool] = mapped_column(Boolean, 
                                                default=False,
                                                server_default=text("False"))

   
   sections: Mapped[list["Section"]] = relationship(  back_populates="collection", 
                                                      cascade="all, delete-orphan",
                                                      order_by="Section.id" )