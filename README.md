# 🍽️ MealBridge – Local Food Waste Reduction Platform

**Live Site:** [https://meal-bridge-efc39.web.app](https://meal-bridge-efc39.web.app)

## 👤 Demo Login Credentials

### 🔑 Admin
- **Email:** `admin@gmail.com`
- **Password:** `1234A@`

### 🏥 Charity
- **Email:** `sumiaya@gmail.com`
- **Password:** `1234A@`

### 🍴 Restaurant
- **Email:** `restaurant@gmail.com`
- **Password:** `1234A@`

### 👥 General User
- Register from the website (Free)
- Can request to become a charity with Stripe payment

---

## 🌟 Website Features

- 🔐 **Role-Based Authentication**: Supports 4 user roles — User, Charity, Restaurant, and Admin
- 💳 **Stripe Integration**: Users pay a one-time fee via Stripe to request the Charity role
- 📦 **Add & Manage Donations**: Restaurants can post surplus food and manage their donations
- 🛒 **Request Donations**: Charities can request donations and confirm pickups
- 📈 **Restaurant Stats Dashboard**: Visualize donation stats by food type and quantity using Recharts
- 📝 **Charity Reviews**: Charities and users can leave reviews for restaurants and food donations
- 🧾 **Transaction History**: Stripe payments are logged and displayed in user dashboards
- 📂 **Admin Controls**: Admin can manage donations, users, role requests, and feature donations
- ❤️ **Favorites System**: Users and charities can save donations to their favorites list
- 🔍 **Search & Sort**: Filter donations by location and sort by pickup time or quantity
- 🔁 **Persistent Login**: Private routes stay accessible even after page reload (using JWT)
- 📱 **Fully Responsive Design**: Works smoothly on mobile, tablet, and desktop
- 🔔 **SweetAlert2 Notifications**: All operations (login, payment, CRUD) use modern alert/toast system
- 🌐 **Environment Security**: MongoDB URI, Stripe API keys, and Firebase configs stored in `.env` files
- 🔒 **JWT & Axios Interceptor**: Secure API access and error handling across all protected routes

---

## ⚙️ Tech Stack & Dependencies

- **Frontend**: React, React Router, Tailwind CSS, DaisyUI, Firebase Auth, TanStack Query, Axios, Stripe, SweetAlert2
- **Backend**: Node.js, Express.js, MongoDB, FirebaseServiceKey
- **Main Libraries**:
  - `@stripe/react-stripe-js`, `@stripe/stripe-js`
  - `firebase`, `axios`, `react-hook-form`
  - `@tanstack/react-query`, `sweetalert2`
  - `recharts`, `moment`, `react-icons`
  - `react-responsive-carousel`, `react-simple-typewriter`, `react-countup`, `lottie-react`

---


> This project is a complete MERN stack application addressing real-world problems of food waste by bridging restaurants with local charities and volunteers. Built with ❤️ by Sumiaya Akther.

