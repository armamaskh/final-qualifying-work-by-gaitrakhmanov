from sqlalchemy.orm import Mapped, mapped_column 


class MIXIN_IdIntPK:
   id: Mapped[int] = mapped_column(primary_key=True)     