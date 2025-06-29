from fastapi import Depends, HTTPException, status
from core.models.user import User

from fastapi_users import FastAPIUsers
from api.dependencies.authentication import get_user_manager
from api.dependencies.authentication import authentication_backend


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [authentication_backend] )

async def get_current_active_administrator( user=Depends(fastapi_users.current_user(active=True) )):
    if not getattr(user, "is_administrator", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN )
    return user



current_active_user = fastapi_users.current_user( active=True, )
current_active_superuser = fastapi_users.current_user( active=True, superuser=True)
current_active_admin = get_current_active_administrator

