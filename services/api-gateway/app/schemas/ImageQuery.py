from pydantic import BaseModel
from typing import List, Any

class ImageQuery(BaseModel):
    k: int
    image: Any

class QueryResult(BaseModel):
    task: str
    result_count: int
    result_list: List[str]