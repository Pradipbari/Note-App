# 📝 Secure Notes App (MERN + Google OAuth + OTP Login)

This is a **full-stack MERN application** that allows users to securely create, view, and manage personal notes.  
It features **Email OTP Authentication** and **Google OAuth 2.0 Login**, secured with **JWT tokens**.  
The app is fully deployed on **Render** with separate frontend and backend services.

---

## 🚀 Features
- **Authentication**
  - Login with **OTP (Email-based)**.
  - Login with **Google OAuth 2.0**.
  - **JWT tokens** for securing API routes.
- **Notes Management**
  - Add new notes.
  - View existing notes.
  - Delete notes.
- **Security**
  - OTPs expire in 10 minutes.
  - Passwords/tokens never stored in plain text.
- **Deployment**
  - Backend (Node.js + Express) deployed on **Render**.
  - Frontend (React.js) deployed on **Render**.
  - MongoDB Atlas used for database storage.

---

## 🛠️ Tech Stack
**Frontend**
- React.js
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- Passport.js (Google OAuth 2.0)
- JWT (JSON Web Tokens)
- Nodemailer (for sending OTPs)

**Database**
- MongoDB Atlas

**Deployment**
- Render (Frontend + Backend hosting)
- Environment variables for secure configs
Check live demo : https://note-app-frontend-wuen.onrender.com
