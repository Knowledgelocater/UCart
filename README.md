
# 🛒 MERN Stack E-commerce Website

A fully functional e-commerce platform built using the **MERN stack** (MongoDB, Express, React, Node.js). The project includes user login/registration, product browsing, filtering, order management, and a seller dashboard.

---

## ⚙️ Tech Stack

### Frontend
- React (via Vite)
- Tailwind CSS
- React Router DOM
- React Hot Toast
- Context API for global state
- Google Fonts (Outfit)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for image uploads)
- Multer (file handling)
- Stripe (payments)
- bcryptjs, JWT (authentication)
- dotenv, cors, cookie-parser

---

## 📁 Project Structure

```bash
project-root/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Cards, etc.)
│   │   ├── pages/       # Route-level pages (Home, MyOrders, etc.)
│   │   ├── context/     # Global AppContext
│   │   └── App.jsx
│   └── index.css        # Tailwind config + theme + Google font
├── server/              # Express Backend
│   ├── server.js        # Entry point
│   ├── routes/          # API routes
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose models
│   └── config/          # DB and env setup
```

---

## 🚀 Frontend Setup

```bash
# 1. Create project with Vite
npm create vite@latest client
cd client

# 2. Install dependencies
npm install

# 3. Add Tailwind CSS
npm install tailwindcss @tailwindcss/vite
npx tailwindcss init
# Update tailwind.config.js & add @import "tailwindcss"; to index.css

# 4. Install router and toast
npm install react-router-dom react-hot-toast

# 5. Start dev server
npm run dev
```

### ✅ Routing Setup

- Wrap `<App />` with `<BrowserRouter>` in `main.jsx`
- Use `NavLink` instead of `<a>` for navigation
- Use `useLocation()` to detect routes like `/seller`

### ✅ State Management (Context API)

- Create `AppContext.jsx` using `createContext()`
- Wrap `<App />` with `AppContext.Provider` in `main.jsx`

---

## ✨ UI Features

- Navbar with category navigation and search filter
- Dynamic category & bestseller components
- Login/Registration form with state handling
- Pages: Home, Product Details, My Orders, Seller Dashboard

📦 Components sourced from [prebuiltui.com](https://prebuiltui.com)

---

## 🛠️ Backend Setup

```bash
# 1. Create backend folder
mkdir server && cd server

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv bcryptjs cloudinary multer cookie-parser jsonwebtoken stripe

# 4. Install dev dependencies
npm install nodemon --save-dev

# 5. Enable ES Modules in package.json
# Add: "type": "module"
# Replace "test" with:
"scripts": {
  "server": "nodemon server.js"
}
```

### ✅ Features

- Password encryption with `bcryptjs`
- JWT-based authentication
- Image uploads with `cloudinary` + `multer`
- Stripe payments
- Modular routes and controller structure

---

## 🔗 Example Route Structure

```bash
/server
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── orderController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
```

---

## 📦 Deployment

Coming soon: Instructions for deploying on Vercel (frontend) and Render/Heroku (backend)

---

## 🙌 Acknowledgements

- UI Components: [prebuiltui.com](https://prebuiltui.com)
- Fonts: Google Fonts – Outfit
- Toast: react-hot-toast
- Images: Cloudinary
- Payment Gateway: Stripe
