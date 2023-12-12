from sqlalchemy import Boolean, Column, Integer, String
from app.database import Base

class Caption(Base):
    __tablename__ = "caption"

    index = Column(Integer, primary_key=True, index=True)
    document_id = Column(String)
    caption = Column(String)
    image_path = Column(String)
    image_type = Column(String)
    first_level_dir = Column(String)
    second_level_dir = Column(String)
    image_file_exist = Column(Boolean)
    