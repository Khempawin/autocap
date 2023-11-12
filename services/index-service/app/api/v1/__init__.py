from fastapi import APIRouter
from . import info, caption, misc

router = APIRouter()

router.include_router(info.router, tags=["info"])
router.include_router(caption.router, prefix="/caption", tags=["caption"])
router.include_router(misc.router, tags=["misc"])
