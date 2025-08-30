# 📧 MailGuard – Secure Authentication System (Fullstack)  

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-green?logo=vercel)](https://mail-guard-gilt.vercel.app/) [![GitHub Repo](https://img.shields.io/badge/📂_GitHub_Repo-black?logo=github)](https://github.com/anuj-singal/MailGuard)  

---

A secure and modern authentication system built with **Next.js**, **TypeScript**, and **MongoDB**.  
MailGuard provides a smooth flow for **sign-up, login, email verification, and password reset**, using **Mailtrap** for safe transactional emails.  

---

### 🏗️ Tech Stack  

![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-blue?logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Next.js%20API%20Routes-Express_like-blue?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb&logoColor=white) ![Mailtrap](https://img.shields.io/badge/Mailtrap-SMTP-orange?logo=maildotru&logoColor=white) ![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel&logoColor=white) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative&logoColor=white) ![Contributions welcome](https://img.shields.io/badge/Contributions-Welcome-success?logo=github)  

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
