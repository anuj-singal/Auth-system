<!-- Banner -->
<p align="center">
  <img src="https://github.com/anuj-singal/MailGuard/mailguard.gif" alt="MailGuard Demo" width="600"/>
</p>

<h1 align="center">📧 MailGuard</h1>
<p align="center">
  A secure authentication system built with <b>Next.js, MongoDB, Mailtrap, and JWT</b>.<br/>
  Verify emails, handle password resets, and manage user sessions with ease.
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

## 📸 Demo
Live Project: [MailGuard on Vercel](https://mail-guard-gilt.vercel.app/)

Demo GIF:  
<p align="center">
  <img src="https://github.com/anuj-singal/MailGuard/mailguard.gif" alt="MailGuard Demo" width="700"/>
</p>

---

## 🏗️ Tech Stack
- **Frontend:** Next.js 14, React, TailwindCSS, Framer Motion  
- **Backend:** Next.js API Routes, MongoDB Atlas, JWT  
- **Email Service:** Mailtrap  
- **Deployment:** Vercel  

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
   git clone https://github.com/anuj-singal/MailGuard.git
   cd MailGuard

2. **Install dependencies**
   npm install

3. **Setup environment variables** in `.env.local`
   MONGO_URI=your_mongodb_connection_string  
   TOKEN_SECRET=your_jwt_secret  
   MAILTRAP_HOST=smtp.mailtrap.io  
   MAILTRAP_PORT=2525  
   MAILTRAP_USER=your_mailtrap_user  
   MAILTRAP_PASS=your_mailtrap_pass  

4. **Run development server**
   npm run dev

5. **Build for production**
   npm run build  
   npm start

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

## 🙌 Acknowledgements
Thanks to **Hitesh Choudhary sir** for inspiring and guiding me in backend + full-stack learning.  
This project was built as part of my practice journey.  

---

## 📜 License
This project is licensed under the **MIT License**.  

---

<p align="center">⭐ If you like this project, consider giving it a star on GitHub!</p>
