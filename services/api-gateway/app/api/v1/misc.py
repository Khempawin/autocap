from fastapi import APIRouter, UploadFile, Form, File, Depends
from typing import Annotated, List
from app.schemas.Query import QueryResult, IndexQuery
from PIL import Image
import io
import base64
import requests
import jsonpickle
from app.config.settings import settings
from sqlalchemy.orm import Session
from app.dependency import get_db
from app import crud
from app.redis_local import redis_client
from app.helper.utils import get_caption

router = APIRouter()


@router.post("/image-2-text", response_model=QueryResult)
def image2test(
    k: Annotated[int, Form()],
    image: Annotated[UploadFile, File()],
    db: Session = Depends(get_db)
    ):
    # Get representation from embedding service
    raw_img = image.file
    raw_data = raw_img.read()
    # img = Image.open(raw_img)
    encoded_img = base64.b64encode(raw_data)
    data = {
        "image": encoded_img
    }
    data = {
        "json_image": jsonpickle.encode(data)
    }
    res = requests.post(f"{settings.embed_service_base_url}/v1/caption/embed-image", json=data)
    res_data = res.json()

    embedding_vector = res_data["result"]
    
    # Get to k results ids from index service
    index_query = {
        "k" : k,
        "embedding_vector": embedding_vector
    }
    res = requests.post(f"{settings.index_service_base_url}/v1/caption/retrieve-index", json=index_query)
    res_data = res.json()

    caption_list = [get_caption(caption_id, True, db) for caption_id in res_data["result"]]

    # For each record in result
    #   get value from redis cache
    #   if value is none then get caption record by id from database
    # Return list of results as json
    response = QueryResult(task="image-2-text", result_count=k, result_list=caption_list)
    return response


@router.post("/embed/image")
def handle_embed_image(image: Annotated[UploadFile, File()]):
    raw_img = image.file
    raw_data = raw_img.read()
    # img = Image.open(raw_img)
    encoded_img = base64.b64encode(raw_data)
    data = {
        "image": encoded_img
    }
    data = {
        "json_image": jsonpickle.encode(data)
    }
    res = requests.post(f"{settings.embed_service_base_url}/v1/caption/embed-image", json=data)
    res_data = res.json()
    return {
        "result": res_data["result"],
        "result_length": res_data["result_length"]
    }


@router.post("/embed/caption")
def handle_embed_caption(caption: Annotated[str, Form()]):
    data = {
        "caption": caption
    }
    res = requests.post(f"{settings.embed_service_base_url}/v1/caption/embed-caption", json=data)
    res_data = res.json()
    return {
        "result": res_data["result"],
        "result_length": res_data["result_length"]
    }


@router.post("/indexing/retreive-index")
def handle_retrieve_index(query: IndexQuery):
    updated_dict = query.model_dump()
    updated_dict["embedding_vector"] = updated_dict.pop("vector")
    res = requests.post(f"{settings.index_service_base_url}/v1/caption/retrieve-index", json=updated_dict)
    res_data = res.json()
    return {
        "result": res_data["result"]
    }


@router.get("/db/caption")
def handle_get_caption(id: int, use_cache: bool, db: Session = Depends(get_db)):
    return {
        "result": get_caption(id, use_cache, db)
    }


@router.get("/redis/cache")
def handle_get_cache():
    keys = redis_client.keys("*")
    data = dict()
    for key in keys:
        val = redis_client.get(key)
        data[key] = val
    return {
        "results": data,
        "record_count": len(data)
    }

@router.delete("/redis/remove-cache")
def handle_remove_cache_record(id: int):
    redis_client.delete(id)
    return {
        "result": "deletion succeeded"
    }