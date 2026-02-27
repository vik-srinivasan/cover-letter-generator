from fastapi import APIRouter, HTTPException

from models.schemas import ScrapeRequest, ScrapeResponse
from services.scrape_service import scrape_job_description

router = APIRouter()


@router.post("/scrape-url", response_model=ScrapeResponse)
async def scrape_url(request: ScrapeRequest):
    try:
        result = scrape_job_description(request.url)
        return ScrapeResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to scrape URL: {str(e)}")
