import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api import v1
from app.config.settings import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect redis client
    # Connect to database
    print("Connection Setup success")
    print(f"CLIP model dir : {settings.clip_model_dir}")
    yield
    # Disconnect redis client
    # Disconnect from database
    print("Clean Up complete: shutting down now")


app = FastAPI(title=settings.app_name, version=settings.version, lifespan=lifespan)

app.include_router(v1.router, prefix="/v1")
# app.include_router(info.router, tags=["info"])
# app.include_router(caption.router, prefix="/caption", tags=["caption"])
# app.include_router(misc.router, tags=["misc"])
