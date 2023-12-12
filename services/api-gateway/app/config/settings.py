from pydantic_settings import BaseSettings
from pydantic import PostgresDsn

class Settings(BaseSettings):
    app_name: str = "API Gateway"
    version: str = "1.0.0"
    embed_service_base_url: str = "http://localhost:8001"
    index_service_base_url: str = "http://localhost:8002"
    caption_db_uri: PostgresDsn = "postgresql+psycopg2://my_user:password123@localhost:5432/my_database"
    redis_host: str = "localhost"
    redis_port: str = "6379"
    redis_cache_seconds: int = 60

settings = Settings()