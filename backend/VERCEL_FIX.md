# 🔧 Fix: "Route not found" Error on Vercel

## Problem
After deploying to Vercel, you're getting `{"message":"Route not found"}` for all routes.

## Root Cause
Vercel serverless functions work differently from traditional Node.js servers:
- Your `server.js` tries to start a server with `app.listen()`
- Vercel doesn't allow this - it needs an exported function handler
- The Express app must be exported directly, not started

## ✅ Solution Applied

### 1. Created `api/index.js` (Vercel Serverless Function)
This file:
- ✅ Exports the Express app as a function handler
- ✅ Manages MongoDB connection (reuses across invocations)
- ✅ Properly handles requests in Vercel's serverless environment

### 2. Updated `vercel.json`
Changed from:
```json
"src": "server.js"
```
To:
```json
"src": "api/index.js"
```

## 🚀 How to Deploy the Fix

### Step 1: Commit and Push
```bash
cd "c:/Users/Asus/Documents/Sheriyans coding school/BACKEND/Caption-io"
git add .
git commit -m "Fix: Update Vercel configuration for serverless deployment"
git push origin main
```

### Step 2: Vercel Auto-Deploys
- Vercel will automatically detect the push
- It will rebuild and redeploy
- Wait ~2-3 minutes

### Step 3: Test Your Deployment
```bash
# Health check
curl https://caption-io.vercel.app/

# Should return:
# {"message":"API is running","status":"healthy"}
```

## 🧪 Testing Endpoints

After the fix is deployed, test these:

### 1. Root Route
```bash
curl https://caption-io.vercel.app/
```
Expected: `{"message":"API is running","status":"healthy"}`

### 2. Register User
```bash
curl -X POST https://caption-io.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test12345"}'
```

### 3. Login
```bash
curl -X POST https://caption-io.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test12345"}'
```

### 4. Contact Form
```bash
curl -X POST https://caption-io.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Hi","message":"Hello"}'
```

## 📊 What Changed

### Before (Not Working)
```
vercel.json → server.js → app.listen() ❌
```

### After (Working)
```
vercel.json → api/index.js → exports handler → Express app ✅
```

## 🔍 Verify Environment Variables

Make sure these are set in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Verify these exist:
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `GEMINI_API_KEY`
   - `IMAGEKIT_PUBLIC_KEY`
   - `IMAGEKIT_PRIVATE_KEY`
   - `IMAGEKIT_URL_ENDPOINT`

## 🐛 If Still Not Working

### Check Vercel Logs
1. Go to: https://vercel.com/dashboard
2. Select your project → **Deployments**
3. Click latest deployment → **View Function Logs**
4. Look for errors

### Common Issues

#### Issue: MongoDB connection fails
**Solution:**
- Check `MONGODB_URL` is correct
- Ensure MongoDB Atlas Network Access: `0.0.0.0/0`
- Verify database user has permissions

#### Issue: Still getting 404
**Solution:**
- Clear Vercel cache: Redeploy from dashboard
- Check `api/index.js` exists in deployed files
- Verify `vercel.json` points to `api/index.js`

#### Issue: Environment variables not found
**Solution:**
- Add them in Vercel Dashboard (not in `.env`)
- Redeploy after adding variables
- Check variable names match exactly

## 📂 Project Structure (Now Correct)

```
backend/
├── api/
│   └── index.js          ← Vercel serverless entry point
├── src/
│   ├── app.js            ← Express app (exported)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── server.js             ← For local development only
├── vercel.json           ← Points to api/index.js
└── package.json
```

## 💡 Understanding Vercel Serverless

### Traditional Server (Local Dev)
```javascript
// server.js - Works locally
app.listen(3000) // Starts a server
```

### Vercel Serverless (Production)
```javascript
// api/index.js - Works on Vercel
module.exports = (req, res) => app(req, res) // Exports handler
```

**Key Difference:**
- Local: Long-running server
- Vercel: Function invoked per request (cold starts)

## ✅ Success Checklist

After pushing the fix:
- [ ] Deployment completes successfully
- [ ] Health check returns "API is running"
- [ ] `/api/auth/register` works
- [ ] `/api/auth/login` works
- [ ] `/api/posts/*` routes work
- [ ] `/api/contact` works
- [ ] Frontend can connect to backend

## 🎉 You're All Set!

Once you push these changes:
1. Vercel auto-deploys
2. Routes work correctly
3. Backend is live!

**Push now:**
```bash
git add .
git commit -m "Fix: Configure Vercel serverless deployment correctly"
git push origin main
```

Then wait 2-3 minutes and test! 🚀

---

**Need help?** Check Vercel deployment logs for specific errors.
