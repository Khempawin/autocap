from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "API Gateway"

settings = Settings()