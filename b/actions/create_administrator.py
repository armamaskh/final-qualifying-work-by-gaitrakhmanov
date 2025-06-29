import contextlib
import asyncio

from os import getenv

from core.authentication.user_manager import UserManager
from core.models import db_helper
from core.models.db_helper import settings

from api.dependencies.authentication import get_user_manager
from api.dependencies.authentication import get_user_db
from core.models.user import User
from core.schemas.user import AdministratorCreate
from fastapi_users.exceptions import UserAlreadyExists

default_email = getenv("DEFAULT_EMAIL", "administrator3@administrator.com")
default_password = getenv("DEFAULT_PASSWORD", 'administrator3')
default_is_active = True
default_is_superuser = True
default_is_verified = True
default_is_administrator = True


get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


async def create_user(  user_manager: UserManager,
                        user_create: AdministratorCreate ) -> User:
   # if user_create.is_administrator 
   user = await user_manager.create(
      user_create=user_create,
      safe=False)
   return user


async def create_superuser_administrator(   email: str = default_email,
                                            password: str = default_password,
                                            is_active: bool= default_is_active,
                                            is_superuser: bool = default_is_superuser,
                                            is_verified: bool = default_is_verified,
                                            is_administrator: bool = default_is_administrator ):
   user_create = AdministratorCreate(  email  = email,
                                           password   = password,
                                           is_active   = is_active,
                                           is_superuser  = is_superuser, 
                                           is_verified   = is_verified,
                                           is_administrator = is_administrator )
   
   async with db_helper.session_factory() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    return await create_user(
                        user_manager=user_manager,  
                        user_create=user_create )

if __name__ == "__main__":
   asyncio.run(create_superuser_administrator())