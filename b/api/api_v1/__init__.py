from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from core.config import settings
from .auth import router as auth_router
from .users import router as users_router
from .messages import router as messages_router
from .forms import router as forms_router
from .collections import router as collection_router
from .sections import router as sections_router
from .divisions import router as divisions_router
from .collection_contents import router as collection_content_router
from .generation_pdf import router as generation_pdf_router


http_bearer = HTTPBearer(auto_error=False)

router = APIRouter(
   prefix=settings.api.v1.prefix,
   dependencies=[Depends(http_bearer)]
   )
   


router.include_router(auth_router)
router.include_router(users_router)
router.include_router(messages_router)
router.include_router(forms_router)
router.include_router(collection_router)
router.include_router(sections_router)
router.include_router(divisions_router)
router.include_router(collection_content_router)
router.include_router(generation_pdf_router)




