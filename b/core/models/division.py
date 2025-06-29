
from typing import TYPE_CHECKING
from core.models.base import Base
from core.models.mixins.int_pk_id import MIXIN_IdIntPK

from sqlalchemy import ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
   from .section import Section
   from .form import Form
   from .collection_content import CollectionContent


class Division(Base, MIXIN_IdIntPK):
   name: Mapped[str]

   order: Mapped[int] = mapped_column(Integer, default=0, 
                                               server_default=text("0"))
   
   section_id: Mapped[int] = mapped_column( Integer, 
                                            ForeignKey("sections.id"))

   form_id: Mapped[int] = mapped_column( Integer, 
                                         ForeignKey("forms.id"))  
   

   section: Mapped["Section"] = relationship(back_populates="divisions")
   form: Mapped["Form"] = relationship()
   content_items: Mapped[list["CollectionContent"]] = relationship(  back_populates="division",
                                                                     cascade="all, delete-orphan",
                                                                     order_by="CollectionContent.order")

    