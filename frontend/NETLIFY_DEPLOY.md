# Deploying Caption.io Frontend to Netlify

This guide explains how to deploy the Caption.io frontend to Netlify.

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup) (free tier is sufficient)
- Your backend API deployed and accessible (e.g., on Render, Heroku, Railway, etc.)
- Git repository pushed to GitHub, GitLab, or Bitbucket

## Deployment Methods

### Method 1: Deploy via Netlify UI (Recommended for beginners)

#### Step 1: Prepare Your Repository
1. Make sure all changes are committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

#### Step 2: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the `Caption-io` repository

#### Step 3: Configure Build Settings
Netlify should auto-detect these settings, but verify:
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/dist`

#### Step 4: Set Environment Variables
1. Before deploying, click **"Show advanced"** → **"New variable"**
2. Add the following environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-api-url.com` (your deployed backend URL)

#### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at a URL like: `https://random-name-12345.netlify.app`

#### Step 6: Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your domain

---

### Method 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Navigate to Frontend Directory
```bash
cd "c:/Users/Asus/Documents/Sheriyans coding school/BACKEND/Caption-io/frontend"
```

#### Step 4: Initialize Netlify Site
```bash
netlify init
```
Follow the prompts:
- Create & configure a new site
- Choose your team
- Site name (optional)
- Build command: `npm run build`
- Directory to deploy: `dist`

#### Step 5: Set Environment Variables
```bash
netlify env:set VITE_API_URL "https://your-backend-api-url.com"
```

#### Step 6: Build and Deploy
```bash
npm run build
netlify deploy --prod
```

---

### Method 3: Drag & Drop Deploy (Quick Test)

#### Step 1: Build Locally
```bash
cd "c:/Users/Asus/Documents/Sheriyans coding school/BACKEND/Caption-io/frontend"
npm run build
```

#### Step 2: Manual Deploy
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `dist` folder
3. Your site will be deployed instantly

⚠️ **Note:** This method doesn't support environment variables easily. Best for testing only.

---

## Important Configuration

### Environment Variables on Netlify

After deployment, you can manage environment variables:
1. Go to **Site settings** → **Environment variables**
2. Add/Edit `VITE_API_URL` to point to your production backend

**Required variable:**
- `VITE_API_URL` - Your backend API URL (e.g., `https://caption-io-api.onrender.com`)

### Updating the Backend URL

Make sure your backend CORS settings allow requests from your Netlify domain:

In `backend/src/app.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-netlify-site.netlify.app'  // Add your Netlify URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## Continuous Deployment

Once connected via Method 1 or 2, Netlify automatically:
- Rebuilds your site when you push to the main branch
- Shows build logs for debugging
- Provides deploy previews for pull requests

---

## Troubleshooting

### Build Fails
- Check the build logs in Netlify dashboard
- Ensure `package.json` has all dependencies
- Verify Node version compatibility (Netlify uses Node 18 by default)

### 404 Errors on Refresh
- Ensure `netlify.toml` includes the SPA redirect rule (already configured)

### API Calls Fail
- Verify `VITE_API_URL` is set correctly in Netlify environment variables
- Check backend CORS settings
- Ensure backend is running and accessible

### Check Environment Variables
```bash
netlify env:list
```

---

## Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] All pages load correctly (Home, About, Features, Contact, Profile)
- [ ] API calls work (login, register, caption generation)
- [ ] Social media links work
- [ ] Images load properly
- [ ] Contact form submits successfully
- [ ] Custom domain configured (if applicable)

---

## Useful Netlify Commands

```bash
# Check deploy status
netlify status

# Open site in browser
netlify open:site

# View build logs
netlify watch

# Deploy a preview (not production)
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Example URLs

After deployment, your site structure will be:
- Homepage: `https://your-site.netlify.app/`
- About: `https://your-site.netlify.app/about`
- Features: `https://your-site.netlify.app/features`
- Contact: `https://your-site.netlify.app/contact`
- Login: `https://your-site.netlify.app/login`

---

## Free Tier Limits

Netlify free tier includes:
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Continuous deployment
- Form submissions (100/month)

This is more than enough for most small to medium projects!

---

## Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- Check build logs in Netlify dashboard for specific errors
