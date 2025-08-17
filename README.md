# MealBridge – Local Food Waste Reduction Platform

## Overview
MealBridge is a **Local Food Waste Reduction Platform** where:
- **Restaurants** donate surplus food.
- **Charities** request and pick up donations.
- **Users** browse listings, save favorites, or request to become charities.

Built with the **MERN stack**, MealBridge has **four user roles**: User, Charity, Restaurant, and Admin.  
Charity requests require **Stripe payment** and Admin approval. Admins can manually assign roles without payment.

---

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

## Live Site
[Visit Live Site](https://meal-bridge-efc39.web.app/)

---

## Key Features
1. **Role-Based Dashboards** – Separate dashboards for User, Charity, Restaurant, and Admin.  
2. **Food Donation Management** – Restaurants can add, update, and manage donations.  
3. **Donation Requests** – Charities request donations; restaurants approve before pickup.  
4. **Favorites & Reviews** – Users and charities can save favorites and submit reviews.  
5. **Charity Role Requests** – Users pay via Stripe to request Charity role; tracked by Admin.  
6. **Admin Controls** – Approve/reject donations, role requests, manage users, feature donations.  
7. **Responsive Design** – Works on mobile, tablet, and desktop.  
8. **Notifications** – SweetAlert2 for all CRUD operations, payments, login, and requests.  
9. **Search & Sort** – Search donations by location, sort by quantity or pickup time.  
10. **JWT Authentication** – Secure login with email/password and Google OAuth.

---

## Pages & Functionality

### 1. Home Page
- Navbar: Home, All Donations, Dashboard, Login.  
- Banner/slider showing platform mission.  
- Featured donations and latest charity requests.  
- Footer with About, Contact, and social links.

### 2. All Donations Page
- Displays **only verified donations** approved by Admin.  
- Each donation card shows:
  - Donation title (e.g., "Fresh Bread Donation")
  - Quantity (e.g., kg or portions)
  - Donation status:
    - **Available** → donation is verified and open for requests
    - **Requested** → a charity has requested this donation
    - **Picked Up** → donation has been collected; no further requests allowed
  - Restaurant name and location
  - Assigned Charity (if any)
- **Workflow:**
  1. Restaurant adds a donation (status: Pending).  
  2. Admin verifies the donation → it becomes visible as **Available**.  
  3. Any charity can request the donation → status changes to **Requested**.  
  4. Restaurant reviews the request and approves → charity can proceed to pick up.  
  5. Once the charity confirms pickup → status updates to **Picked Up**.  
  6. After pickup, the donation **cannot be requested by anyone else**.
- **Features:** Search by location and sort by quantity or pickup time.

### 3. Donation Details Page (Private)
- Full donation info: title, description, restaurant, quantity, pickup time, status.  
- Actions: Save to favorites, request donation (Charity), confirm pickup (Charity), add review.

### 4. User Dashboard
- **My Profile:** View/update personal info.  
- **Request Charity Role:** Stripe payment form for role upgrade.  
- **Favorites:** View/remove saved donations.  
- **My Reviews:** View/delete submitted reviews.  
- **Transaction History:** Track payments for Charity role requests.

### 5. Restaurant Dashboard
- **Profile:** View restaurant info.  
- **Add Donation:** Add surplus food donations.  
- **My Donations:** Edit or delete donations.  
- **Requested Donations:** Approve/reject charity requests.

### 6. Charity Dashboard
- **Profile:** View profile info.  
- **My Requests:** Track donation requests.  
- **My Pickups:** Manage accepted donations and confirm pickup.  
- **Received Donations:** View completed pickups and add reviews.  
- **Transaction History:** Track Charity role payments.

### 7. Admin Dashboard
- **Profile:** View admin info.  
- **Manage Donations:** Approve/reject donations.  
- **Manage Users:** Assign roles, delete users.  
- **Manage Role Requests:** Approve/reject charity role requests.  
- **Manage Requests:** Manage charity donation requests.  
- **Feature Donations:** Select donations to feature on the home page.

---

## Additional Features
- Email/password authentication via Firebase.  
- Google OAuth login.  
- SweetAlert2 notifications for all actions.  
- TanStack Query for data fetching and mutations.  
- Optional Mapbox integration for donation locations.  
- Optional Swiper.js slider for banners.

---

## GitHub Repositories
- **Server Side:** [https://github.com/Sumiaya-Akther/meal-bridge-server](https://github.com/Sumiaya-Akther/meal-bridge-server)

---

## Environment Variables
- `REACT_APP_FIREBASE_API_KEY`  
- `REACT_APP_FIREBASE_AUTH_DOMAIN`  
- `REACT_APP_FIREBASE_PROJECT_ID`  
- `REACT_APP_STRIPE_PUBLIC_KEY`  
- `MONGODB_URI`  
- Any other sensitive keys (Mapbox token, etc.)

---

### Dependencies & Libraries

This project uses the following main libraries and tools:

- **React & React DOM** (`react`, `react-dom`)  
  Core libraries for building the frontend UI.

- **React Router** (`react-router`)  
  Handles navigation between pages and dashboards.

- **Firebase** (`firebase`)  
  Provides authentication and backend services like storing user info.

- **Axios** (`axios`)  
  HTTP client for API requests to the backend or Firebase.

- **TanStack React Query** (`@tanstack/react-query`)  
  Manages data fetching, caching, and state updates for donations, requests, and transactions.

- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)  
  Payment integration for Charity role requests.

- **TailwindCSS & DaisyUI** (`tailwindcss`, `daisyui`, `@tailwindcss/vite`)  
  Utility-first CSS framework and prebuilt UI components for styling.

- **Framer Motion** (`framer-motion`)  
  Adds smooth animations for buttons, modals, and cards.

- **React Hook Form** (`react-hook-form`)  
  Handles form validation and submission for donations, requests, and profiles.

- **SweetAlert2** (`sweetalert2`)  
  Provides toast notifications and alert modals for user feedback.

- **React Icons** (`react-icons`)  
  Includes icon sets for UI elements like user, email, save, undo, etc.

- **Recharts** (`recharts`)  
  Visualizes donation statistics in charts on dashboards.

- **AOS** (`aos`)  
  Adds scroll-based animations for page elements.

- **React Leaflet & Leaflet** (`react-leaflet`, `leaflet`)  
  Displays maps showing donation locations.

- **React Responsive Carousel** (`react-responsive-carousel`)  
  Implements sliders for the home page banners or featured donations.

- **Lottie React** (`lottie-react`)  
  Shows animated graphics for loading screens and UI effects.

- **Moment** (`moment`)  
  Formats and displays dates/times across the platform.

- **React CountUp** (`react-countup`)  
  Animates counters for statistics like total donations or meals saved.

- **React Simple Typewriter** (`react-simple-typewriter`)  
  Displays typewriter-style animated text on banners or headings.


---

> This project is a complete MERN stack application addressing real-world problems of food waste by bridging restaurants with local charities and volunteers. Built with ❤️ by Sumiaya Akther.

