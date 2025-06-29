from sqlalchemy import Boolean
from sqlalchemy.orm import Mapped, mapped_column 


class MIXIN_BoolIsAdministrator:
   is_administrator: Mapped[bool] = mapped_column(
      Boolean, server_default="false", nullable=False)