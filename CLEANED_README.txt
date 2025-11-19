Cleaned repository for Render deployment.

Contents:
- backend/   -> Node/Express backend. Use this as Render backend service root.
- frontend/  -> Frontend app. Use this as Render static site or Node service as needed.

Recommended Render settings:

Backend service:
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
- Environment: set MONGO_URI and other vars
- Port: do NOT set PORT in env; let Render provide it. Ensure your backend listens on process.env.PORT or default.

Frontend service:
- Root Directory: frontend
- Build Command: npm install && npm run build
- Start Command: (for static) set as 'npm run start' if app has it or use Render static site option
- If single service: point to frontend build output

Notes:
- I removed duplicate/legacy 'server' folder and other top-level clutter.
- If you want me to also adjust package.json or create a CI, tell me.

