# ApniSec - Cybersecurity Platform

A full-stack cybersecurity platform built with Node.js/Express backend (OOP architecture) and React frontend with TailwindCSS.

🌐 **Live Application:** https://frontend-apnisec.vercel.app  
📦 **GitHub Repository:** https://github.com/SandeepKumarSolanki/apnisec  

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB)

## 🛡️ Features

- **Custom JWT Authentication** - Secure login/register with bcrypt password hashing
- **Rate Limiting** - 100 requests per 15 minutes with proper headers
- **Email Notifications** - Resend integration for welcome & issue alerts
- **Issue Management** - Track Cloud Security, VAPT, and Reteam Assessments
- **Modern UI** - Responsive design with dark cybersecurity theme
- **OOP Architecture** - Class-based backend with handlers, services, repositories

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js, MongoDB |
| Frontend | React 18, TailwindCSS, React Router |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Email | Resend API |

## 🚀 Live Deployment

- **Frontend (Vercel):** https://frontend-apnisec.vercel.app  
- **Backend:** Deployed with environment-based configuration  
- **API Base URL:** `/api`

---

## 📈 SEO & Lighthouse Score

The application has been optimized for search engines and accessibility.

- ✅ **SEO Score:** **92% (Google Lighthouse)**
- ✅ **Best Practices:** 100%
- ✅ **Performance:** 83%
- ✅ **Accessibility:** 73%

> Lighthouse testing performed using **Chrome DevTools → Lighthouse (Production build)**.  
> Screenshot included for assignment submission.

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://atlas.mongodb.com))
- [Resend](https://resend.com) account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd apni
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/apnisec
   JWT_SECRET=your-super-secret-key-change-this
   JWT_EXPIRES_IN=7d
   RESEND_API_KEY=re_xxxxxxxxxxxx
   EMAIL_FROM=onboarding@resend.dev
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment**
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on http://localhost:5000

3. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## 📁 Project Structure

```
apni/
├── backend/
│   ├── src/
│   │   ├── config/        # Database, JWT, Rate limit configs
│   │   ├── errors/        # Custom error classes
│   │   ├── handlers/      # Route handlers (controllers)
│   │   ├── middlewares/   # Auth, Rate limiting, Error handler
│   │   ├── models/        # MongoDB schemas
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # JWT, Password utilities
│   │   ├── validators/    # Input validation
│   │   └── app.js         # Express app setup
│   ├── server.js          # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── context/       # Auth context
    │   ├── hooks/         # Custom hooks
    │   ├── pages/         # Page components
    │   └── services/      # API services
    ├── index.html
    └── package.json
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |

### Issues
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | List all issues |
| POST | `/api/issues` | Create issue |
| GET | `/api/issues/:id` | Get single issue |
| PUT | `/api/issues/:id` | Update issue |
| DELETE | `/api/issues/:id` | Delete issue |

**Query Parameters for Issues:**
- `?type=cloud-security` - Filter by type
- `?status=open` - Filter by status

## 🔐 Rate Limiting

- **Limit**: 100 requests per 15 minutes
- **Tracking**: By IP address or User ID (if authenticated)
- **Headers**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Timestamp when limit resets

## 📧 Email Notifications

Emails are sent via Resend for:
- Welcome email on registration
- Issue created notification
- Profile updated notification

## 📱 Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (public) |
| `/login` | Login page |
| `/register` | Registration page |
| `/dashboard` | Issue management (protected) |
| `/profile` | User profile (protected) |

## 🎨 Issue Types

- **Cloud Security** - Cloud infrastructure security assessments
- **Reteam Assessment** - Red team security exercises
- **VAPT** - Vulnerability Assessment and Penetration Testing

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

ApniSec Team

---

**Note:** Remember to update the JWT secret and Resend API key before deploying to production.
