# 🛒 UCart - Full-Stack MERN E-Commerce Platform

UCart is a fully functional e-commerce website built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It features a modern UI, seamless routing, global state management, seller dashboard, secure authentication, and payment integration using Stripe.

---

## 📌 Features

### 🧑‍💼 **User Features**

* Sign up / Login
* Browse Products & Categories
* Search & Filter Items
* View Product Details
* Add to Cart / Wishlist
* Place Orders
* View My Orders

### 🛍️ **Seller Features**

* Seller Dashboard
* Add / Edit / Delete Products
* View Orders
* Analytics (Best Sellers, Total Orders)

### 🔐 **Authentication & Authorization**

* Secure Passwords with bcryptjs
* JWT-based Authentication
* Cookie Handling

### 💸 **Payment Gateway**

* Stripe Integration for Safe Transactions

---

## 💻 Tech Stack

### 📦 Frontend

* React + Vite
* Tailwind CSS
* React Router DOM
* React Hot Toast (Alerts)
* Global State via Context API

### 🛠️ Backend

* Node.js + Express
* MongoDB + Mongoose
* Stripe API for Payments
* Multer + Cloudinary (Image Upload)
* JWT + BcryptJS (Auth)

---

## 📁 Folder Structure Overview

```bash
UCart/
├── client/             # Frontend React App
│   ├── public/
│   └── src/
│       ├── assets/     # Images & static assets
│       ├── components/ # UI components (User + Seller)
│       ├── context/    # App-level state management
│       └── pages/      # App-level pages (Home, Login, etc.)
│
├── server/             # Backend Node.js App
│   ├── configs/        # DB and Cloudinary config
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose models
│   ├── middlewares/    # Auth middleware
│   └── routes/         # Express API endpoints
```

---

## 🚀 Getting Started

### 🧰 Prerequisites

* Node.js
* MongoDB

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/Knowledgelocater/UCart.git

# Install frontend dependencies
cd client
npm install

# Run the frontend
npm run dev

# Open another terminal for backend
cd ../server
npm install
npm run server
```

---

## 🔑 Environment Variables

Create a `.env` file in `/server`:

```env
MONGO_URL=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
CLOUD_NAME=<Cloudinary Cloud Name>
API_KEY=<Cloudinary API Key>
API_SECRET=<Cloudinary API Secret>
STRIPE_SECRET_KEY=<Your Stripe Secret Key>
```

---

## 🌐 Deployment

* Frontend: \[Vercel / Netlify]
* Backend: \[Render / Railway / Cyclic]

> Deployment scripts and configurations can be added as per hosting preference.

---

## 🙋‍♂️ Author

* **Kinshuk Shukla**
  B.Tech Civil Engg @ NIT Jamshedpur
  Passionate about full-stack development & product building

---

## 📎 Useful Commands

```bash
# Run backend with nodemon
yarn run server
# or
npm run server

# Run frontend
npm run dev
```

---

## 📬 Contact

For collaboration or queries:
📧 [kinshukshukla.dev@gmail.com](mailto:shuklakinshuk067@gmail.com)

---

## ⭐️ If you like this project, don't forget to star the repo!
