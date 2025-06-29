
from typing import TYPE_CHECKING
from core.models.base import Base
from core.models.mixins.date_created_updated_at import MIXIN_DatetimeCreatedAt
from core.models.mixins.int_pk_id import MIXIN_IdIntPK

from sqlalchemy import Boolean, ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
   from .division import Division
   from .form import Form
   from .form_submissions import FormSubmission


class CollectionContent(Base, MIXIN_IdIntPK, MIXIN_DatetimeCreatedAt):
  
   order: Mapped[int] = mapped_column(Integer, default=0, 
                                               server_default=text("0"))
   
   is_selected: Mapped[bool] = mapped_column(Boolean, default=False, server_default=text("False"))
   
   division_id: Mapped[int] = mapped_column( Integer, 
                                             ForeignKey("divisions.id"))

   submission_id: Mapped[int] = mapped_column( Integer, 
                                               ForeignKey("form_submissions.id"))
   

   submission: Mapped["FormSubmission"] = relationship()
   division: Mapped["Division"] = relationship( back_populates="content_items")

    