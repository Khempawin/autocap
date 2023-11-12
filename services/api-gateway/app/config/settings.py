from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "API Gateway"
    version: str = "1.0.0"

settings = Settings()