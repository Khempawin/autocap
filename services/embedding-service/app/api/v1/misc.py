from fastapi import APIRouter
from app.schemas.ImageQuery import ImageQuery, QueryResult


router = APIRouter()


@router.post("/image-2-text", response_model=QueryResult)
def image2test(query: ImageQuery):
    # Get representation from embedding service
    # Get to k results ids from index service
    # For each record in result
    #   get value from redis cache
    #   if value is none then get caption record by id from database
    # Return list of results as json
    response = QueryResult(task="image-2-text", result_count=query.k, result_list=["caption1", "caption2"])
    return response
