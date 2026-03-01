# Cover Letter Generator

Upload a job description and your resume — get a personalized cover letter powered by Claude.

## Local Development

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add your Anthropic API key
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Render

Create a single **Web Service** with:

- **Build command:** `./build.sh`
- **Start command:** `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment variable:** `ANTHROPIC_API_KEY`
