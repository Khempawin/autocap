from sqlalchemy.orm import Session
from app.redis_local import redis_client
from app.config.settings import settings
from app import crud


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