import logging

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from models.schemas import GenerateResponse
from services.claude_service import generate_cover_letter, refine_cover_letter
from services.pdf_service import extract_text_from_pdf

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate(
    job_description: str = Form(...),
    resume: UploadFile = File(...),
    additional_docs: list[UploadFile] = File(default=[]),
    previous_letter: str = Form(default=""),
    feedback: str = Form(default=""),
):
    logger.info("Generate endpoint hit: resume=%s, feedback=%s", resume.filename, bool(feedback))
    try:
        # Extract resume text
        resume_bytes = await resume.read()
        resume_text = extract_text_from_pdf(resume_bytes)
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from resume PDF")

        # Extract additional docs
        additional_parts: list[str] = []
        for doc in additional_docs:
            doc_bytes = await doc.read()
            doc_text = extract_text_from_pdf(doc_bytes)
            if doc_text.strip():
                additional_parts.append(doc_text)
        additional_context = "\n\n".join(additional_parts)

        # Generate or refine
        if previous_letter and feedback:
            cover_letter = refine_cover_letter(
                job_description=job_description,
                resume_text=resume_text,
                previous_letter=previous_letter,
                feedback=feedback,
            )
        else:
            cover_letter = generate_cover_letter(
                job_description=job_description,
                resume_text=resume_text,
                additional_context=additional_context,
            )

        return GenerateResponse(cover_letter=cover_letter)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")
