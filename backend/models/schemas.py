from pydantic import BaseModel


class ScrapeRequest(BaseModel):
    url: str


class ScrapeResponse(BaseModel):
    text: str
    title: str


class GenerateResponse(BaseModel):
    cover_letter: str
