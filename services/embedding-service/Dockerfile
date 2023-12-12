FROM python:3.10-slim-bookworm

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN ["pip", "install", "--no-cache-dir", "torch", "torchvision", "torchaudio", "--index-url", "https://download.pytorch.org/whl/cpu"]

RUN ["pip", "install", "--no-cache-dir", "--upgrade", "-r", "requirements.txt"]

COPY ./models /app/models

COPY ./app /app/app

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]