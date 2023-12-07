from fastapi import APIRouter, UploadFile, Form, File
from typing import Annotated
from app.schemas.ImageQuery import ImageQuery, QueryResult
from PIL import Image
import io
import base64

router = APIRouter()


@router.post("/image-2-text", response_model=QueryResult)
def image2test(
    k: Annotated[int, Form()],
    image: Annotated[UploadFile, File()],
    ):
    print(image.file)
    # print(len(query.image))
    # print(base64.b64decode(query.image)[:32])
    # img_data = io.BytesIO(base64.b64decode(query.image))
    # img = Image.open(image.file)
    # print(img.size)
    # Get representation from embedding service
    # Get to k results ids from index service
    # For each record in result
    #   get value from redis cache
    #   if value is none then get caption record by id from database
    # Return list of results as json
    response = QueryResult(task="image-2-text", result_count=k, result_list=["caption1", "caption2"])
    return response
