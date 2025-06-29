from typing import TYPE_CHECKING
import uuid
from sqlalchemy import Boolean,  Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship


from core.models.base import Base
from core.models.mixins.date_created_updated_at import MIXIN_DatetimeCreatedAt
from core.models.mixins.relation_user import RELATION_MIXIN_USER
from core.models.mixins.int_pk_id import MIXIN_IdIntPK

if TYPE_CHECKING:
   from .form_submissions import FormSubmission
   from .section import Section



class Form(Base, MIXIN_IdIntPK, 
                 RELATION_MIXIN_USER, 
                 MIXIN_DatetimeCreatedAt):
   _user_id_unique_ = False
   _user_back_populates_ = "forms"
 

   name: Mapped[str]

   description: Mapped[str] = mapped_column(String(500), default="",
                                                         server_default="")
   content: Mapped[str] = mapped_column(String, default="[]",
                                                server_default="[]")
   visits: Mapped[int] = mapped_column(Integer, default=0,
                                                server_default=text("0"))
   submissions: Mapped[int] = mapped_column(Integer, default=0,
                                                     server_default=text("0"))
   share_url: Mapped[str] = mapped_column(   String(36),
                                             unique=True,
                                             nullable=False,
                                             default=lambda: str(uuid.uuid4()) )
   
   published: Mapped[bool] = mapped_column(Boolean, default=False,
                                                     server_default=text("False"))

   form_submissions: Mapped[list["FormSubmission"]] = relationship(back_populates="form")
