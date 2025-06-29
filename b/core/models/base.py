from sqlalchemy import MetaData
from sqlalchemy.orm import ( DeclarativeBase, 
                             declared_attr )
from sqlalchemy.orm import Mapped, mapped_column 

from utils import convert_to_name_for_table
from core.config import settings

#! Базовая сущность, благодаря которой формируются модели таблиц
class Base(DeclarativeBase):
   __abstract__ = True
   
   metadata = MetaData(
      naming_convention=settings.db.naming_convention)

   @declared_attr.directive
   def __tablename__(cls):
      return f'{convert_to_name_for_table(cls.__name__)}s'
   
