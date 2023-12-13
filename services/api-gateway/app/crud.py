from sqlalchemy.orm import Session
from app import schemas, models

def get_caption(db: Session, caption_id: int):
    return db.query(models.Caption).filter(models.Caption.index == caption_id).first()
