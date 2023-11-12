import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api import info, caption, misc

APP_NAME = os.getenv("APP_NAME") if os.getenv("APP_NAME") else "API Gateway"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect redis client
    # Connect to database
    print("Connection Setup success")
    yield
    # Disconnect redis client
    # Disconnect from database
    print("Clean Up complete: shutting down now")


app = FastAPI(title=APP_NAME, lifespan=lifespan)

app.include_router(info.router, tags=["info"])
app.include_router(caption.router, prefix="/caption", tags=["caption"])
app.include_router(misc.router, tags=["misc"])
