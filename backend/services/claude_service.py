import os

import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You write cover letters. Given a job description and resume, produce a \
concise, personalized cover letter that connects the candidate's background to the role.

Keep it professional, natural, and brief — a few short paragraphs. \
Only reference experience that appears in the resume. \
Output the cover letter text only, nothing else."""


def generate_cover_letter(
    job_description: str,
    resume_text: str,
    additional_context: str = "",
) -> str:
    """Generate a cover letter from job description and resume."""
    user_message = f"""Write a cover letter for the following job based on my resume.

--- JOB DESCRIPTION ---
{job_description}

--- MY RESUME ---
{resume_text}"""

    if additional_context:
        user_message += f"\n\n--- ADDITIONAL CONTEXT ---\n{additional_context}"

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )
    return response.content[0].text


def refine_cover_letter(
    job_description: str,
    resume_text: str,
    previous_letter: str,
    feedback: str,
) -> str:
    """Refine an existing cover letter based on feedback."""
    user_message = f"""Here is a cover letter I previously generated. The user wants revisions.

--- JOB DESCRIPTION ---
{job_description}

--- RESUME ---
{resume_text}

--- CURRENT COVER LETTER ---
{previous_letter}

--- REVISION INSTRUCTIONS ---
{feedback}

Please rewrite the cover letter incorporating the feedback. Output ONLY the revised cover letter."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )
    return response.content[0].text
