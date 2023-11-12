from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Embedding Service"

settings = Settings()