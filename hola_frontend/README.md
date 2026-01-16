# Hola - Instagram Clone Frontend

Complete Instagram clone frontend built with React, Vite, and Tailwind CSS.

## Features

✅ User Authentication (Email/Password + Google OAuth)
✅ Email OTP Verification
✅ Create Posts with Image Upload
✅ Feed Display
✅ Like/Unlike Posts
✅ Delete Posts
✅ Responsive Design
✅ Instagram-like UI

## Tech Stack

- **React** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP Client
- **React Icons** - Icons
- **React Toastify** - Notifications
- **@react-oauth/google** - Google OAuth

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Google Client ID
Edit `src/pages/Login.jsx` and replace the Google Client ID:
```javascript
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
```

### 3. Configure Backend URL
The frontend is configured to connect to backend at `http://localhost:5000`.
If your backend runs on a different port, update `src/services/api.js`.

### 4. Start Development Server
```bash
npm run dev
```

The app will start on `http://localhost:5173`

## Backend Setup

Make sure your backend is running on `http://localhost:5000` with the following endpoints:

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/google/verify` - Google OAuth

### Posts
- `GET /api/posts/feed` - Get all posts
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like/unlike post
- `DELETE /api/posts/:id` - Delete post

## Folder Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── PostCard.jsx
│   ├── CreatePost.jsx
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── VerifyOTP.jsx
│   └── Home.jsx
├── services/           # API services
│   ├── api.js
│   ├── authService.js
│   └── postService.js
├── context/            # React Context
│   └── AuthContext.jsx
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Build for Production

```bash
npm run build
```

## Environment Variables

No environment variables needed for basic setup. All configurations are in the code.

## Features to Implement (Future)

- [ ] User Profile Page
- [ ] Follow/Unfollow System
- [ ] Comments on Posts
- [ ] Search Users
- [ ] Notifications
- [ ] Stories
- [ ] Direct Messaging
- [ ] Multiple Images per Post

## License

MIT
