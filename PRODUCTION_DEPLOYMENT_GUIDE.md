# Production Deployment Guide: Preventing CORS Errors

When deploying your MERN stack application to production, you need to configure both your frontend and backend to talk to each other securely without triggering CORS (Cross-Origin Resource Sharing) errors. 

Here is a checklist of exactly what you need to change.

## 1. Backend Changes (Server)

Currently, your backend uses `app.use(cors())` which allows requests from *any* origin. In production, you should restrict this to only allow requests from your frontend's production URL.

### Update `server/src/app.js`
Modify the CORS configuration to accept requests specifically from your frontend URL.

```javascript
// server/src/app.js

// Replace app.use(cors()); with:

const corsOptions = {
  // Use an environment variable for the frontend URL, fallback to localhost for development
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Required if you are sending cookies/tokens back and forth
};

app.use(cors(corsOptions));
```

### Update Server Environment Variables
Wherever you host your backend (e.g., Render, Heroku, AWS), add the `FRONTEND_URL` to your environment variables:
```env
FRONTEND_URL=https://your-production-frontend-domain.com
PORT=5001
```
*(Make sure to use `https://` and do NOT include a trailing slash)*

---

## 2. Frontend Changes (Client)

Your frontend needs to know where the production backend is hosted so it doesn't try to fetch data from `http://localhost:5001`.

### Update Client Environment Variables
Wherever you host your frontend (e.g., Vercel, Netlify, AWS S3), you need to set the `VITE_API_URL` environment variable in their dashboard settings to point to your deployed backend URL.

```env
# In your Vercel/Netlify Dashboard Environment Variables:
VITE_API_URL=https://your-production-backend-domain.com/api
```

*(Notice we include `/api` at the end since your backend routes use `/api/auth`, `/api/leaders`, etc.)*

### Verify `client/src/services/api.js`
Your `api.js` file is already set up correctly to use this variable! It looks like this:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```
Since it uses `import.meta.env.VITE_API_URL`, the build process will automatically inject your production backend URL when you deploy the frontend.

---

## 🚀 Summary Checklist for Production

- [ ] Deploy the **backend** first to get its live URL (e.g., `https://api.mywebsite.com`).
- [ ] Add the backend's live URL as `VITE_API_URL` in the **frontend's** hosting environment variables.
- [ ] Deploy the **frontend** to get its live URL (e.g., `https://mywebsite.com`).
- [ ] Add the frontend's live URL as `FRONTEND_URL` in the **backend's** hosting environment variables.
- [ ] Update `app.js` on the backend to use `process.env.FRONTEND_URL` inside the `cors()` config.
- [ ] Restart both servers if required by your hosting provider.
