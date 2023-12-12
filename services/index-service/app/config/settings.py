from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Indexing Service"
    version: str = "1.0.0"
    startup_data_path: str = "./caption_200k.parquet"

settings = Settings()