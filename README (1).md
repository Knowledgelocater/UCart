
# 🛒 UCart - MERN Stack E-Commerce Website

UCart is a fully functional e-commerce platform built using the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a modern frontend, secure authentication, seller dashboard, product management, and Stripe-powered payment integration.

---

## 🌐 Live Demo

Coming soon...

---

## 📂 Project Structure

```
UCart/
│
├── client/             # React + Vite frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Pages for routing
│   │   ├── context/    # Global state management
│   │   └── main.jsx    # App entry point with routing
│   └── package.json    # Frontend dependencies
│
├── server/             # Express backend
│   ├── config/         # DB connection & env config
│   ├── controllers/    # Business logic for routes
│   ├── middleware/     # Auth, error handlers, etc.
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── server.js       # Main backend server file
│   └── package.json    # Backend dependencies
```

---

## 🚀 Frontend Setup (`client/`)

Built with **Vite + React**, **Tailwind CSS**, and **React Router DOM**.

### Installation Steps

```bash
cd client
npm install
npm run dev
```

### Features Implemented

- ✅ Tailwind CSS with custom theme
- ✅ Google Fonts (Outfit)
- ✅ React Router for navigation
- ✅ React Hot Toast for notifications
- ✅ Global State via Context API
- ✅ Responsive Navbar with NavLink
- ✅ Category & Bestseller UI
- ✅ Login / Registration Modal
- ✅ Seller Dashboard with Route Protection
- ✅ Dynamic Product Filtering via Search

---

## 🛠 Backend Setup (`server/`)

Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

### Installation Steps

```bash
cd server
npm install
npm run server
```

> Ensure MongoDB is running locally or update your `.env` with a remote URI.

### Key Dependencies

```json
"dependencies": {
  "bcryptjs": "...",
  "cloudinary": "...",
  "cookie-parser": "...",
  "cors": "...",
  "dotenv": "...",
  "express": "...",
  "jsonwebtoken": "...",
  "mongoose": "...",
  "multer": "...",
  "stripe": "..."
}
```

### Key Functionalities

- ✅ Express REST API
- ✅ MongoDB with Mongoose
- ✅ User & Seller Authentication (JWT)
- ✅ Password Encryption (bcryptjs)
- ✅ File Upload (Multer + Cloudinary)
- ✅ Cookie-based Session Management
- ✅ Product Management
- ✅ Orders & My Orders
- ✅ Stripe Integration for Payments

---

## 🧠 Context & State Management

Using `Context API` in `AppContext.jsx`, we manage:
- Auth State
- User Info
- Seller Info
- Cart/Order State
- Navigation logic using `useNavigate`
- Dashboard UI detection using `useLocation`

---

## 🔐 Security Features

- Passwords are hashed with `bcryptjs`
- JWT used for access control
- Middleware protects private routes
- Secure file uploads via Cloudinary
- Environment variables via `.env`

---

## 💳 Payment Integration

We use **Stripe** to handle secure payments:
- Payment intents
- Checkout sessions
- Success & failure callbacks

---

## 📸 Media Upload

Product images and other uploads are:
- Accepted via `multer` middleware
- Stored and managed using Cloudinary API

---

## 🧪 Dev Tools

- **Nodemon** for hot reloading backend
- **Postman** for testing APIs
- **Console logging** for debugging
- **Environment-based config** via `dotenv`

---

## 📦 Future Enhancements

- 🔍 Add unit/integration testing using Jest
- 📊 Admin Analytics Dashboard
- 🌐 Internationalization (i18n)
- 📝 API documentation (Swagger)
- 📈 Email verification / Order confirmation via Mailer
- 📋 Logging with Winston or Morgan
- 🧾 PDF Invoice Generation

---

## 🧠 Learnings & Skills Practiced

- MERN Stack development
- Routing & Dynamic Component Rendering
- Secure File Handling & Auth Workflows
- Stripe Integration
- Component-based UI architecture
- Responsive Design with Tailwind
- Full-stack RESTful API Development

---

## 🤝 Contribution

Contributions, issues and feature requests are welcome!  
Feel free to [open an issue](https://github.com/Knowledgelocater/UCart/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Kinshuk Shukla**  
- GitHub: [@Knowledgelocater](https://github.com/Knowledgelocater)  
- Email: kinshukshukla2@gmail.com

---

## ⭐ Star this repository if you found it useful!

```bash
git clone https://github.com/Knowledgelocater/UCart.git
cd UCart
```

---
