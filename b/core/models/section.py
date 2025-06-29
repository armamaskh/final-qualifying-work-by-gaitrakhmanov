
from typing import TYPE_CHECKING
from core.models.base import Base
from core.models.mixins.int_pk_id import MIXIN_IdIntPK

from sqlalchemy import ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
   from .collection import Collection
   from .division import Division


class Section(Base, MIXIN_IdIntPK):
   name: Mapped[str]

   section_type: Mapped[str] = mapped_column(String) 

   collection_id: Mapped[int] = mapped_column(Integer, 
                                              ForeignKey("collections.id"))
   

   collection: Mapped["Collection"] = relationship(back_populates="sections")
   divisions: Mapped[list["Division"]] = relationship(back_populates="section", 
                                                      cascade="all, delete-orphan",
                                                      order_by="Division.order")
