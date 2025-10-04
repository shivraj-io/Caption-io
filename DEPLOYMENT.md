# Caption.io - Complete Deployment Guide

## 🎯 Deployment Overview

```
Frontend (React + Vite) → Netlify
Backend (Express + MongoDB) → Vercel
Database → MongoDB Atlas (Cloud)
```

---

## 📝 Deployment Checklist

### 1️⃣ Backend Deployment (Do This First)

- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Get API keys (Gemini AI, ImageKit)
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables on Vercel
- [ ] Test backend health check
- [ ] Copy Vercel backend URL

### 2️⃣ Frontend Deployment (Do This Second)

- [ ] Update `VITE_API_URL` with Vercel backend URL
- [ ] Push code to GitHub
- [ ] Deploy to Netlify
- [ ] Add environment variables on Netlify
- [ ] Test frontend loads correctly
- [ ] Copy Netlify frontend URL

### 3️⃣ Final Configuration

- [ ] Add Netlify URL to Vercel's `FRONTEND_URL` variable
- [ ] Redeploy backend on Vercel
- [ ] Test complete flow (register, login, caption generation)
- [ ] Test contact form submission

---

## 🔑 Required Environment Variables

### Backend (Vercel)
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/caption-io
JWT_SECRET=your_32_character_minimum_random_string
FRONTEND_URL=https://your-site.netlify.app
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NODE_ENV=production
```

### Frontend (Netlify)
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🔗 How to Get API Keys

### MongoDB Atlas
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (allow all)
5. Get connection string

### Gemini AI (Google)
1. Visit: https://makersuite.google.com/app/apikey
2. Create API key
3. Copy key

### ImageKit
1. Visit: https://imagekit.io/
2. Sign up free
3. Go to Dashboard → Developer Options
4. Copy: Public Key, Private Key, URL Endpoint

### JWT Secret
Generate a random string (32+ characters):
- Visit: https://randomkeygen.com/
- Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 📦 Quick Deploy Commands

### Backend to Vercel
```bash
cd backend
vercel login
vercel --prod
# Add environment variables in Vercel Dashboard
```

### Frontend to Netlify
```bash
cd frontend
netlify login
netlify init
netlify env:set VITE_API_URL "https://your-backend.vercel.app"
netlify deploy --prod
```

---

## 🧪 Testing Endpoints

### Backend Health Check
```bash
curl https://your-backend.vercel.app/
```

### Register User
```bash
curl -X POST https://your-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

### Contact Form
```bash
curl -X POST https://your-backend.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Hi","message":"Hello"}'
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check MongoDB Atlas allows 0.0.0.0/0 in Network Access
- Verify MONGODB_URL format is correct
- Ensure database user password is correct

### Issue: "CORS error" in frontend
**Solution:**
- Add Netlify URL to Vercel's `FRONTEND_URL` variable
- Redeploy backend
- Clear browser cache

### Issue: "Module not found" on Vercel
**Solution:**
- Check all dependencies in package.json
- Remove node_modules and package-lock.json
- Commit and redeploy

### Issue: "Function timeout" on Vercel
**Solution:**
- Vercel free tier: 10s timeout
- Optimize slow routes (AI generation)
- Consider upgrading to Pro plan

---

## 📊 Platform Comparison

| Feature | Vercel | Netlify | Railway | Render |
|---------|--------|---------|---------|--------|
| **Best for** | Serverless APIs | Static sites | Full apps | Full apps |
| **Free Tier** | ✅ Generous | ✅ Good | ⚠️ Limited | ✅ Good |
| **Timeout** | 10s (Free) | N/A | No limit | 60s |
| **Database** | External | External | Built-in | External |
| **Setup** | Easy | Easy | Medium | Easy |

**Our Choice:**
- Frontend → Netlify (perfect for React/Vite)
- Backend → Vercel (easy serverless deployment)

---

## 📚 Documentation Links

- **Vercel Backend Guide:** `backend/VERCEL_DEPLOY.md`
- **Netlify Frontend Guide:** `frontend/NETLIFY_DEPLOY.md`
- **Environment Variables:** See `.env.example` files

---

## 🎯 Success Criteria

Your deployment is successful when:
1. ✅ Backend health check returns "API is running"
2. ✅ Frontend loads without errors
3. ✅ User can register and login
4. ✅ Caption generation works
5. ✅ Image upload works
6. ✅ Contact form submission works

---

## 🚀 Deployment URLs

After deployment, you'll have:
- **Frontend:** `https://caption-io.netlify.app`
- **Backend:** `https://caption-io-backend.vercel.app`

Update these in your environment variables!

---

## 💡 Pro Tips

1. **Deploy backend first** - Frontend needs backend URL
2. **Test locally** before deploying - Use `npm run dev`
3. **Check logs** if errors occur - `vercel logs` or Netlify dashboard
4. **Use environment variables** - Never hardcode secrets
5. **Enable auto-deploy** - Push to main branch → auto deploys

---

## 🆘 Need Help?

If stuck, check:
1. Deployment logs (Vercel/Netlify dashboard)
2. Browser console (F12) for frontend errors
3. MongoDB Atlas logs for database issues
4. Full guides in `VERCEL_DEPLOY.md` and `NETLIFY_DEPLOY.md`

Good luck! 🎉
