from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Embedding Service"
    version: str = "1.0.0"

settings = Settings()