from pydantic import BaseModel
from typing import List, Any
from fastapi import UploadFile

class ImageQuery(BaseModel):
    k: int
    image: UploadFile


class QueryResult(BaseModel):
    task: str
    result_count: int
    result_list: List[str]


class IndexQuery(BaseModel):
    k: int
    vector: List[float]