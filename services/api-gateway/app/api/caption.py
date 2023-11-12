from fastapi import APIRouter

router = APIRouter()


@router.get("/info")
def caption_database_info():
    # Get caption count
    # Get unique document id count
    return {
        "caption_count" : 40000,
        "document_source_count": 1000 
    }


@router.post("/add")
def add_caption():
    # Get embedded representation from embedding service
    # Save caption to database, get saved id
    # Send embedded representation index-service
    return {
        "result" : "success" 
    }

