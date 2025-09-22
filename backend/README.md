# Social Media Backend (Express + MongoDB)

A minimal API for auth and posts, with image upload and AI-generated captions. Ready to test in Postman.

## Quick start

- Prereqs: Node 18+ and MongoDB URI
- Setup and run:

```
npm install
npm start
```

The server prints the URL, e.g. http://localhost:5000

## Environment (.env)

These are used if available:
- PORT=5000
- HOST=0.0.0.0
- MONGODB_URL=mongodb+srv://...
- JWT_SECRET=your-secret
- IMAGEKIT_PUBLIC_KEY=...
- IMAGEKIT_PRIVATE_KEY=...
- IMAGEKIT_URL_ENDPOINT=...

Notes:
- If ImageKit keys are missing, uploads return a placeholder URL so you can test from Postman.
- If the Gemini API (Google GenAI) is unavailable, caption falls back to a sample string.

## Endpoints

- GET `/` → { message: 'API is running' }
- GET `/healthz` → ok
- POST `/api/auth/register`
  - JSON: { "username": "alice", "password": "secret" }
- POST `/api/auth/login`
  - JSON: { "username": "alice", "password": "secret" }
  - Returns: { token, user }
  - Also sets an httpOnly cookie `token`
- POST `/api/posts`
  - Headers: `Authorization: Bearer <token>` (or rely on cookie)
  - Body: form-data with key `image` (file)
  - Returns: created post with caption and image URL

## Postman

Import `docs/social-media-backend.postman_collection.json` and set the collection variable `baseUrl` to your server URL (default http://localhost:5000).

Flow:
1) Register → Login
2) Login test stores `token` variable automatically
3) Create Post → form-data: key `image` type File

If you prefer cookies, enable cookie jar in Postman; the `/login` response sets a `token` cookie.

## Dev notes

- Tech: Express 5, Mongoose 8, Multer, JWT
- Auth middleware accepts either cookie `token` or `Authorization: Bearer <token>`
- Collections: `users`, `posts`
