from fastapi import APIRouter, Form, File, UploadFile
from typing import Annotated
from app.ai_models import clip
from PIL import Image
from app.helper import utils
import torch
import numpy as np

router = APIRouter()


@router.get("/info")
def caption_database_info():
    # Get caption count
    # Get unique document id count
    return {
        "caption_count" : 40000,
        "document_source_count": 1000 
    }


@router.post("/embed-caption")
def embed_caption(
    caption: Annotated[str, Form()]
    ):
    embedded_caption = utils.embed_caption(caption).tolist()
    return {
        "result" : embedded_caption,
        "result_length" : len(embedded_caption)
    }

@router.post("/embed-image")
def embed_image(
    image: Annotated[UploadFile, File()]
):
    img = Image.open(image.file)    
    embedded_image = utils.embed_image(img).tolist()
    return {
        "result" : embedded_image,
        "result_length" : len(embedded_image)
    }

