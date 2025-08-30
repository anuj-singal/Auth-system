<h1 align="center">📧 MailGuard</h1>
<p align="center">
  MailGuard is a secure authentication system built with <b> Next.js, TypeScript, MongoDB, and Mailtrap</b>. </br>
  It provides a modern, user-friendly flow for <b>sign-up, login, email verification, and password reset</b>.    
</p>

---

## 📸 Demo

Live Project: [MailGuard on Vercel](https://mail-guard-gilt.vercel.app/)

Demo:  
<p align="center">
  <img src="mailguard.gif" alt="MailGuard Demo" width="700"/>
</p>

---

## 🚀 Features

- 🔐 User authentication (Register & Login)
- ✉️ Email verification via Mailtrap
- 🔑 Secure password reset with tokenized links
- 🍪 JWT & cookies for session management
- 🛡️ Protected routes & middleware
- 🎨 Modern UI with TailwindCSS + Framer Motion
- ☁️ Fully deployed on **Vercel**

---

## 🏗️ Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + TailwindCSS  
- **Backend**: Next.js API Routes (Node.js / Express-like)  
- **Database**: MongoDB Atlas  
- **Email**: Mailtrap SMTP  
- **Deployment**: Vercel  

---

## 📂 Project Structure

MailGuard/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   ├── profile/       # User profile
│   │   └── api/           # API routes (auth, users, etc.)
│   ├── components/        # Reusable UI components
│   └── utils/             # Helpers (e.g., getDataFromToken)
├── public/                # Static assets (images, gif, etc.)
├── .env.local             # Environment variables
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/anuj-singal/MailGuard.git
   cd MailGuard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
  
3. **Setup environment variables** in `.env.local`
   ```bash
   MONGO_URI=your_mongo_connection
   MAILTRAP_USER=your_mailtrap_username
   MAILTRAP_PASS=your_mailtrap_password
   TOKEN_SECRET=your_secret_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
5. **Build for production**
    ```bash
   npm run build  
   npm start
   ```
---

## 🌐 Deployment

This project is deployed on **Vercel**.  
To deploy your own instance:
1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com).
3. Add the environment variables in the Vercel dashboard.
4. Deploy 🚀

---

## 💡 Learnings

- Understanding Next.js App Router with authentication flows.
- Using Mailtrap for email verification in dev.
- Deploying full-stack Next.js apps with environment variables on Vercel.

---

## 📜 License
This project is licensed under the **MIT License**.  

---

<p align="center">⭐ If you like this project, consider giving it a star on GitHub!</p>
