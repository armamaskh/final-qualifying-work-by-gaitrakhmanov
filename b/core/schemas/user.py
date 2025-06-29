from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    is_administrator: bool = False
    pass


class UserCreate(schemas.BaseUserCreate):
    pass

class AdministratorCreate(schemas.BaseUserCreate):
    is_administrator: bool = False
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass