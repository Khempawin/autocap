import torch
import numpy as np
from app.ai_models import clip
from PIL import Image

def embed_caption(caption: str):
    caption_list = [caption]
    image_list = [clip.DUMMY_IMAGE]
    with torch.no_grad():
        inputs = clip.processor(
            text=caption_list,
            images=image_list,
            return_tensors="pt",
            padding=True
            )
        outputs = clip.model(**inputs)
    embedded_caption = np.asarray(outputs.text_embeds[0])
    return embedded_caption


def embed_image(image: Image): 
    caption_list = [clip.DUMMY_TEXT]
    image_list = [image]
    with torch.no_grad():
        inputs = clip.processor(
            text=caption_list,
            images=image_list,
            return_tensors="pt",
            padding=True
            )
        outputs = clip.model(**inputs)
    embedded_image = np.asarray(outputs.image_embeds[0])
    return embedded_image