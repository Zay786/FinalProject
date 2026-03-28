# Vercel Deployment

This repository can be deployed to one Vercel project without changing the folder structure:

- `frontend/` builds the React app
- `api/index.js` serves the Node.js API on `/api/*`
- `ml-service/api/vercel_quotation_api.py` serves the Python quotation endpoint on `/api/ml/*`

## Environment variables

Add these in your Vercel project settings:

- `DATABASE_URL`
- `REACT_APP_API_BASE_URL`

Recommended values:

- `DATABASE_URL`: your Neon PostgreSQL connection string
- `REACT_APP_API_BASE_URL`: leave empty for same-origin requests, or set `https://<your-vercel-domain>`

Optional:

- `ML_API_URL`: `https://<your-vercel-domain>/api/ml`

The backend also still supports these database variables if you prefer them:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

## How it works on Vercel

- `/api/login` and `/api/quotation` go to the Node backend
- `/api/ml/generate` goes to the Python service
- all other routes fall back to the React app for client-side routing

If `ML_API_URL` is not set, the backend automatically calls the Python function on the same Vercel domain.

## Important note

The quotation PDF is generated in memory and returned in the same response. That avoids local file storage, which is not reliable on Vercel serverless functions.
