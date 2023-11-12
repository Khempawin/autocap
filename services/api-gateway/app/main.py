import os
from fastapi import FastAPI
from app.api import info, caption, misc

APP_NAME = os.getenv("APP_NAME") if os.getenv("APP_NAME") else "API Gateway"

app = FastAPI(title=APP_NAME)

app.include_router(info.router, tags=["info"])
app.include_router(caption.router, prefix="/caption", tags=["caption"])
app.include_router(misc.router, tags=["misc"])
# app.include_router(oauth.router, prefix="/oauth", tags=["oauth"])
# app.include_router(user.router, prefix="/user", tags=["user"])

