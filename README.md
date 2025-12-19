# core-backend

A core backend **monorepo** that hosts multiple backend services within a single repository.  
This repository serves as the **central backend** for several systems/applications using a **single deployment instance**.

Each service is separated by purpose but runs under one server with centralized routing.

---

## 🧩 Architecture Concept

- **Backend monorepo**
- **Single deployment**
- **Multiple services**
- Centralized routing via `app.js`
- Shared resources (middleware, models, utilities)

Suitable for:
- Personal projects
- MVPs
- Multiple backend services with limited infrastructure resources

---

## 📂 Folder Structure

```text
core-backend/
├── algoritm/          # Algorithm logic or experiments
├── apitokenxl/        # Backend service for XL token management
├── cloudinary/        # Cloudinary configuration and helpers
├── journalingApi/     # Backend service for journaling features
├── controllers/       # Main controllers
├── routes/            # API routing
├── middleware/        # Middleware (auth, validation, etc.)
├── models/            # Database models (MongoDB)
├── socket.js          # Socket.IO handlers
├── server.js          # Server entry point
├── app.js             # Main application & route aggregator
├── .env.example       # Environment variable template
├── package.json
└── README.md
```

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Socket.IO** (Realtime communication)
- **Cloudinary** (File upload)
- **JavaScript**

---

## 🧠 Author

**Faezol MP**  
Backend & Android Engineer



