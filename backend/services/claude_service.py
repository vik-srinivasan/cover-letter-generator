import os

import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are an expert cover letter writer. You produce concise, professional, \
and personalized cover letters that highlight the candidate's relevant experience and \
enthusiasm for the role.

Guidelines:
- Keep it to 3-4 paragraphs, roughly 250-400 words
- Open with a strong hook — not "I am writing to apply for..."
- Connect the candidate's specific experiences to the job requirements
- Show genuine enthusiasm for the company and role
- Close with a confident call to action
- Use a professional but warm tone
- Do not fabricate any experience — only reference what's in the resume
- Output ONLY the cover letter text, no headers or metadata"""


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
