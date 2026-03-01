from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from routers import generate, scrape

app = FastAPI(title="Cover Letter Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api")
app.include_router(scrape.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}


# Serve frontend static export if available (production build)
static_dir = Path(__file__).parent / "static"
if static_dir.is_dir():
    # Serve Next.js asset directories
    for subdir in ("_next", "images"):
        sub_path = static_dir / subdir
        if sub_path.is_dir():
            app.mount(f"/{subdir}", StaticFiles(directory=sub_path), name=subdir)

    @app.get("/{path:path}")
    async def serve_frontend(path: str):
        # Try exact file match first (e.g. favicon.ico)
        file = static_dir / path
        if file.is_file():
            return FileResponse(file)
        # Fall back to index.html
        return FileResponse(static_dir / "index.html")
