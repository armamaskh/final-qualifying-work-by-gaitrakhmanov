
from typing import Annotated
from fastapi import APIRouter, Depends

from core.config import settings
from core.models import User
from core.schemas.user import UserRead
from ..dependencies.authentication.fastapi_users import current_active_user, current_active_superuser, current_active_admin

router = APIRouter(
   prefix=settings.api.v1.messages,
   tags = ["Messages"] )

@router.get("")
def get_user_messages( user: Annotated[ User, 
                                        Depends(current_active_user) ]  ):
   return { "messages": ["m1", "m2", "m3"],
            "user": UserRead.model_validate(user) }

@router.get("/secrets")
def get_superuser_messages( user: Annotated[ User,
                                             Depends(current_active_superuser) ] ):

   return { "messages": ["secret_m1", "secret_m2", "secret_m3"],
            "user": UserRead.model_validate(user) }


@router.get("/adm")
def get_admin_messages( user: Annotated[ User,
                                         Depends(current_active_admin) ] ):

   return { "messages": ["super_secret_m1", "super_secret_m2", "super_secret_m3"],
            "user": UserRead.model_validate(user) }
