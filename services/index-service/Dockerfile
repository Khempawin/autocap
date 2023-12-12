FROM python:3.10-slim-bookworm

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN ["pip", "install", "--no-cache-dir", "--upgrade", "-r", "requirements.txt"]

COPY ./app /app/app

COPY ./caption_200k.parquet /app

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]