from pydantic import BaseModel

class CaptionBase(BaseModel):
    index : int
    document_id : str
    caption : str
    image_path : str
    image_type : str
    first_level_dir : str
    second_level_dir : str
    image_file_exist : bool

    class Config:
        from_attributes = True
        

class AddCaption(BaseModel):
    caption: str