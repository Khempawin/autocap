from fastapi import APIRouter
from PIL import Image
from app.helper import utils
from app.schemas.Embedding import ImageEmbedQuery, CaptionEmbedQuery
import base64
import io
import jsonpickle

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
    query: CaptionEmbedQuery
    ):
    embedded_caption = utils.embed_caption(query.caption).tolist()
    return {
        "result" : embedded_caption,
        "result_length" : len(embedded_caption)
    }

@router.post("/embed-image")
def embed_image(
    query: ImageEmbedQuery
):
    data = jsonpickle.loads(query.json_image)
    print(type(data["image"]))
    io_buffer = io.BytesIO(base64.b64decode(data["image"]))
    img = Image.open(io_buffer)
    embedded_image = utils.embed_image(img).tolist()
    return {
        "result" : embedded_image,
        "result_length" : len(embedded_image)
    }