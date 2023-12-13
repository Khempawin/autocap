from sqlalchemy.orm import Session
from app.redis_local import redis_client
from app.config.settings import settings
from app import crud
import jsonpickle


def get_caption(caption_id: int, use_cache: bool, db: Session):
    cached_content = redis_client.get(caption_id)
    if(use_cache and cached_content):
        # print("Using cache")
        return cached_content
    else:
        # print("Using direct database")
        # Get caption from database
        captions = crud.get_caption(db, caption_id)
        # Save caption to cache
        redis_client.set(caption_id, captions.caption, ex=settings.redis_cache_seconds)
        return captions.caption
    

def get_caption_count(use_cache: bool, db: Session):
    caption_count_key = "CAPTION_COUNT"
    cached_content = redis_client.get(caption_count_key)
    if(use_cache and cached_content):
        return cached_content
    else:
        caption_count = crud.get_caption_count(db)
        # Save caption to cache
        redis_client.set(caption_count_key, caption_count, ex=settings.redis_cache_seconds)
        return caption_count
    

def get_caption_page(page: int, use_cache: bool, db: Session):
    caption_page_key = f"CAPTION_PAGE_{page}"
    PAGE_SIZE = 10
    offset = (page - 1) * PAGE_SIZE
    cache_content = redis_client.get(caption_page_key)
    if(use_cache and cache_content):
        return jsonpickle.decode(cache_content)
    else:
        caption_page = crud.get_caption_list(offset, PAGE_SIZE, db)
        # Save page to cache
        redis_client.set(caption_page_key, jsonpickle.encode(caption_page), ex=settings.redis_cache_seconds)
        return caption_page