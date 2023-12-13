from fastapi import APIRouter, Depends
from typing import Annotated, List
from app.schemas.Query import QueryResult, IndexQuery
from app.config.settings import settings
from sqlalchemy.orm import Session
from app.dependency import get_db
from app import crud
from app.redis_local import redis_client
from app.helper.utils import get_caption, get_caption_count, get_caption_page


router = APIRouter()


@router.get("/info")
def caption_database_info(use_cache: bool=True, db: Session = Depends(get_db)):
    # Get caption count
    return {
        "caption_count" : get_caption_count(use_cache, db),
    }


@router.get("/db/caption")
def handle_get_caption(id: int, use_cache: bool, db: Session = Depends(get_db)):
    return {
        "result": get_caption(id, use_cache, db)
    }


@router.get("/db/caption-page")
def handle_get_caption_page(page: int=1, use_cache: bool=True, db: Session = Depends(get_db)):
    return {
        "result": get_caption_page(page, use_cache, db)
    }


@router.post("/add")
def add_caption():
    # Get embedded representation from embedding service
    # Save caption to database, get saved id
    # Send embedded representation index-service
    return {
        "result" : "success" 
    }

