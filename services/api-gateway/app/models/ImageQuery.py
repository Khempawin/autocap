from pydantic import BaseModel
from typing import List

class ImageQuery(BaseModel):
    k: int
    image: bytes

class QueryResult(BaseModel):
    task: str
    result_count: int
    result_list: List[str]