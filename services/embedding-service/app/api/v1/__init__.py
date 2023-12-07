from fastapi import APIRouter
from . import info, caption

router = APIRouter()

router.include_router(info.router, tags=["info"])
router.include_router(caption.router, prefix="/caption", tags=["caption"])