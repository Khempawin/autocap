from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return "Welcome to API version 1"
