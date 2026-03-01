import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import generate, scrape

app = FastAPI(title="Cover Letter Generator API")

allowed_origins = ["http://localhost:3000"]
if extra := os.getenv("ALLOWED_ORIGINS"):
    allowed_origins.extend(extra.split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api")
app.include_router(scrape.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
