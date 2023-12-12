from pydantic import BaseModel
from typing import List

class ImageEmbedQuery(BaseModel):
    json_image: str # base64 encoded

class CaptionEmbedQuery(BaseModel):
    caption: str