from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship, declared_attr

from typing import TYPE_CHECKING
if TYPE_CHECKING:
   from core.models.form import Form


class RELATION_MIXIN_FORMS:
   _form_id_unique_: bool = False
   _form_id_nullable_: bool = False
   _form_back_populates_: str | None = None


   @declared_attr
   def form_id(cls) -> Mapped[int]:
      return mapped_column( Integer, 
                            ForeignKey("forms.id"),
                             unique=cls._form_id_unique_,
                             nullable=cls._form_id_nullable_, )
   @declared_attr
   def form(cls) -> Mapped["Form"]:
      return relationship("Form",
                          back_populates= cls._form_back_populates_)