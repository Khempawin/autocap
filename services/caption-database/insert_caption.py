import pandas as pd
import psycopg2
from sqlalchemy import create_engine

df = pd.read_parquet("caption_200k.parquet", engine="pyarrow")

engine = create_engine("postgresql+psycopg2://my_user:password123@localhost:5432/my_database")

df.drop(columns=["encoded_image", "encoded_caption"]).to_sql("caption", engine, if_exists="replace", index=False)

# df.to_parquet("caption.parquet", engine="pyarrow")