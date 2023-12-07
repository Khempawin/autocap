from transformers import (
    VisionTextDualEncoderProcessor,
    AutoModel,
    AutoTokenizer,
    AutoImageProcessor,
)
from PIL import Image
import numpy as np
from app.config.settings import settings

# Used to enable VisionTextDualModel encoding of Text
DUMMY_IMAGE = Image.fromarray(np.random.randint(255, size=(224,224,3),dtype=np.uint8))

DUMMY_TEXT = "sample"

tokenizer = AutoTokenizer.from_pretrained(settings.clip_model_dir)
image_processor = AutoImageProcessor.from_pretrained(settings.clip_model_dir)

model = AutoModel.from_pretrained(settings.clip_model_dir)
processor = VisionTextDualEncoderProcessor(image_processor, tokenizer)