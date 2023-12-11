from fastapi import APIRouter
from app.helper.indexer import indexer
from typing import List
from pydantic import BaseModel

router = APIRouter()

class IndexQuery(BaseModel):
    k: int
    embedding_vector: List[float]
    
@router.get("/info")
def caption_database_info():
    indexer.index.code_size
    # Get caption count
    # Get unique document id count
    return {
        "caption_count" : indexer.index.ntotal,
        "document_source_count": 1000 
    }


@router.post("/retrieve-index")
def search_index(query: IndexQuery):
    # Get embedded representation from embedding service
    results = indexer.retrieve_caption_index(query.embedding_vector, query.k)
    # Save caption to database, get saved id
    results = [int(idx) for idx in results]
    print(results)
    print(type(results))
    # Send embedded representation index-service
    return {
        "result" : results
    }

