from sqlalchemy.orm import Session
from app import schemas, models

def get_caption(db: Session, caption_id: int):
    return db.query(models.Caption).filter(models.Caption.index == caption_id).first()

def get_caption_count(db: Session):
    return db.query(models.Caption).count()

def get_caption_list(start: int, limit: int, db: Session):
    return db.query(models.Caption).order_by(models.Caption.index).offset(start).limit(limit).all()