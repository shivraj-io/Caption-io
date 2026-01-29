# Caption-io

Caption-io is a full-stack web application that generates captions for user-provided content.  
The project focuses on backend API development, authentication, and frontend–backend integration.

This project was built to gain hands-on experience with REST API design, JWT-based authentication, and real-world debugging during development and deployment.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Caption generation via backend APIs
- Secure API access for authenticated users
- Frontend UI to interact with backend services
- Error and success message handling

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

### Frontend
- React.js
- Axios
- Basic UI for API interaction

---

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is securely hashed using bcrypt
3. JWT token is generated on successful login
4. Token is sent to the client and used to access protected routes

---

## 📁 Project Structure

caption-io/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── pages/
│
└── README.md


---

## ⚠️ Known Limitations / Issues Faced

- Tokens are stored on the client side (localStorage)
- Refresh token mechanism is not implemented
- Single user role (no admin/user separation)
- APIs are not versioned (`/api/v1`)
- Error handling can be further standardized
- No caching layer (Redis) implemented
- Monolithic architecture, not optimized for high traffic
- Faced CORS issues during frontend-backend integration
- Environment variable misconfiguration during deployment

These limitations were identified during development and helped improve understanding of scalable and secure backend design.

---

## 📈 Scalability Improvements (Planned)

- Implement role-based access control (admin/user)
- Add API versioning
- Introduce refresh tokens for authentication
- Use Redis for caching
- Improve logging and monitoring
- Break monolith into modular services if scaled further

---

## 🧪 Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm start
Create a .env file in backend with:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
